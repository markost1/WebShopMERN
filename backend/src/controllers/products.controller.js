import { Category } from "../models/CategoryModel.js";
import { Product } from "../models/ProductModel.js";

export const createProduct = async(req,res)=>{

    const {
        name,
        description,
        imageUrl,
        price,
        countInStock,
        category,
        brand,
        isActive} = req.body;

        try {

        const categoryExists = await Category.findById(category);
        
        if(!categoryExists){
            return res.status(400).json({message:"Category does not exist"})
        }
            
            const newProduct = new Product({
                name,
                description,
                imageUrl,
                price,
                countInStock,
                category,
                brand,
                isActive
            })

            await newProduct.save();

            res.status(201).json({message:"Product created successfully", product:newProduct})

        } catch (error) {
            res.status(500).json({message:"Something went wrong", error:error.message})   
            console.log(error);
                     
        }


}


export const getAllProducts = async(req,res)=>{

    const {search,minPrice,maxPrice} = req.query;
    console.log(search);
    
    
    try {

        let query = {};

        //Search Filter
        if(search && search.trim() !== ""){
            query.$or=[
                {name:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},
                {brand:{$regex:search,$options:"i"}},
               
            ]
        }
         

         //min & max price filter

         if(minPrice || maxPrice){
            query.price = {}
            if(minPrice){
                query.price.$gte = Number(minPrice);
            }
            if(maxPrice){
                query.price.$lte = Number(maxPrice);
            }
         }

        console.log(query);
        
        const findAll = await Product.find(query).populate('category')
        res.status(200).json(findAll);
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }
}


export const getSingleProduct = async(req,res)=>{
    const {id} = req.params
    
    try {
      const singleProduct = await Product.findById(id).populate('category');
      if(!singleProduct){
        res.status(404).json({message:"Product not found"})
        return;
      }  

      res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }
    
}

export const updateProduct = async(req,res)=>{
    const {id}= req.params;

    try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    if(!product){
        res.status(404).json({message:"Product not found"})
        return
    }

    res.status(200).json({message:"Product updated successfully", product});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }
   
}

export const deleteProduct = async(req,res)=>{
    const {id} =  req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:"Product not found"})
            return;
        }

        res.status(204).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }

}

export const viewCount = async(req,res)=>{
    const {id} = req.params

    try {
        const products = await Product.findById(id);
        if(!products){
            res.status(404).json({message:"Product not found"})
            return;
        }

        products.views += 1;
        await products.save();

        res.status(200).json({message:"View count updated", views:products.views});

    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }
}


