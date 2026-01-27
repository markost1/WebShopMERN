import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:[String],   
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Category",   
    },
    brand:{
        type:String,
        required:true
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);