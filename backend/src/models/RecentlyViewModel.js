import mongoose from "mongoose";


const RecentlyViewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique: true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            }
        }
    ]
},{ timestamps: true });


export const RecentlyView = mongoose.model('RecentlyView',RecentlyViewSchema);