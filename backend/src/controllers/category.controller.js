import { Category } from "../models/CategoryModel.js";


export const createCategory = async (req,res) => {

    const {name,description} = req.body;

    if(!name || !description){
        return res.status(400).json({message:"All fields are required"})
    }

    try {
        const newCategory = new Category({name,description});
        await newCategory.save();

    } catch (error) {
        res.status(500).json({message:"Server Error"})
        return;
    }


    res.status(201).json({message:"Category is successfully created"})  
}