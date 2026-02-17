import { Cart } from "../models/CartModel.js";



export const addToCart = async(req, res) => {
    const userId = req.user.id;
    const {productId, quantity} = req.body;

    try {
        let cart = await Cart.findOne({ userId }) 

        if(!cart){
     
          cart = new Cart({
            userId,
            products: []
      });
    }
           
            
          console.log("this is cart json data :",cart);
          

            const productIndex = cart.products.findIndex(
                 (item) => item.productId.equals(productId)
);

            if(productIndex > -1){
                cart.products[productIndex].quantity += quantity;
            }else{
                cart.products.push({productId,quantity});
            }

            
       

         await cart.save();

         res.status(200).json({ message: "Product added to cart successfully", cart });   
   
        } catch (error) {
      
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log(error);
        
    }
    
    
}


export const getCart = async(req,res)=>{
    const id = req.user.id;

    try {

        const cart = await Cart.findOne({userId:id}).populate('products.productId'); 

        if(!cart){
            return res.status(200).json({message:"Cart is empty"});
        }

        res.status(200).json(cart);

        
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})   
        console.log(error);
    }
}

export const removeFromCart = async(req,res)=>{
    const id = req.user.id;
    const {productId} = req.params;


    try {
        const cart = await Cart.findOne({userId:id})
        if(!cart){
            return res.status(400).json({message:"Cart not found"})
        }

        cart.products = cart.products.filter((item)=>{
            return item.productId.toString() !== productId
        })

        await cart.save();

        res.status(200).json({message:"Cart item is successfully removed",cart})


    } catch (error) {
        res.status(500).json({message:"Internal server error",error})
        console.log(error);
        
    }

}


export const increaseQuantity = async(req,res)=>{
    const {productId} = req.params;
    const userId = req.user.id

    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(200).json({message:"Cart not found"})
            return;
        }

        const productIndex = cart.products.findIndex((item)=>
         item.productId.toString() === productId
        )

        if(productIndex === -1){
            res.status(404).json({message:"Product not found"})
            return
        }
        cart.products[productIndex].quantity += 1
        await cart.save();

        res.status(200).json({message:'Quantity increased',new:cart.products})


    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
        console.log(error);
        
    }
}

export const decreaseQuantity = async(req,res)=>{
    const userId = req.user.id;
    const {productId} = req.params;

    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(404).json({message:"Cart not found"})
            return
        }

        const productIndex = cart.products.findIndex((item)=>
        item.productId.toString() === productId
        )

        if(productIndex === -1){
            res.status(404).json({message:"Product not found in cart"})
            return;
        }

        

        if(cart.products[productIndex].quantity === 1){
            cart.products.splice(productIndex,1)
        }else{
            cart.products[productIndex].quantity -= 1 
        }

        await cart.save()

        return res.status(200).json({message:'Quantity decreased', cart:cart.products})


        
    } catch (error) {
        res.status(500).json({message:"Internal server error",error})
        console.log(error);
        return
        
    }
}

export const saveCartCheckout = async(req,res) =>{
    const userId = req.user.id;
    const{shippingAddress, shippingMethod,paymentMethod} = req.body;
    
    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(404).json({message:"Cart not found"})
            return;
        }
            
        cart.shippingAddress = shippingAddress;
        cart.shippingMethod = shippingMethod;
        cart.paymentMethod = paymentMethod;

        

       
        await cart.save();


        res.status(200).json({message:"Cart checkout information saved",cart})
    } catch (error) {
         res.status(500).json({message:"Internal server error",error})
        console.log(error);
        
    }


}