import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
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
            quantity:{
                type:Number,
                default:1
            }
        },
    ],
    shippingAddress:{
        name:{type:String},
        surname:{type:String},
        email:{type:String},
        phone:{type:String},
        city:{type:String},
        postalCode:{type:String},
        street:{type:String},
        numberOfStreet:{type:String},

    }, 
    shippingMethod:{
        type:{
        type:String,
        enum:["standard","express"],
       
        },
        price:{
            type:Number,
           
        }
    },
    paymentMethod: {
         type: String,
         enum: ["card", "cash_on_delivery"]
    },


}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);

