import { RecentlyView } from "../models/RecentlyViewModel.js";

export const addRecentlyViewed = async(req,res)=>{

        const userId = req.user.id;
        const {productId} = req.body;
        console.log("user ID JE SLEDECI : " ,userId);
        

        try {
            let recent = await RecentlyView.findOne({userId});
            if(!recent){
                recent = new RecentlyView({
                    userId,
                    products:[{productId}]
                })
            }else{
                recent.products = recent.products.filter((id) => id.productId.toString() !== productId)
                recent.products.unshift({productId})
                recent.products = recent.products.slice(0,5)
            }

            await recent.save();

            res.status(200).json({message:'ProductId added to recentview model',recent} );

            
        } catch (error) {
            res.status(500).json({message:"Server error",error})
            console.log(error);
            
        }
} 

export const getRecentlyViewed = async(req,res)=>{
    const userId = req.user.id
    console.log(userId);

    try {
        const viewed = await RecentlyView.findOne({userId}).populate('products.productId');
        if(!viewed){
            res.status(400).json({viewed:[]})
        }

        res.status(200).json({viewed: viewed.products})
    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
    
}