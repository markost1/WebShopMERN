import mongoose from 'mongoose';

const orederSchema = new mongoose.Schema({
    
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",  
                required:true           
        },
        name:{
            type:String,
            required:true},
        price:{
            type:Number,
            required:true},
        quantity:{
            type:Number,
            required:true
        }
        
        }],

        totalPrice:{
            type:Number,
            required:true               
        },
        status:{
            type:String,
            enum:["Pending","Shipped","Delivered","Cancelled"],
            default:"Pending"
        }   
},{timestamps:true});

export const Order = mongoose.model("Order",orederSchema);
            