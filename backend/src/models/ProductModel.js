import mongoose from "mongoose";
import { type } from "os";

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
    },
    views:{
        type:Number,
        default:0
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);