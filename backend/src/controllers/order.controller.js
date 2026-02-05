import { Cart } from "../models/CartModel.js"
import { Order } from "../models/OrderModel.js";

export const createOrder = async(req,res)=>{

    const userId = req.user.id

    try {
        const cart = await Cart.findOne({userId}).populate('products.productId');
        if(!cart || cart.products.length === 0){
            res.status(400).json({message:"Empty cart"})
            return;
        }

        let totalPrice = 0;

        const productOrder = cart.products.map((item)=>{
        totalPrice += item.productId.price * item.quantity;

       //snapshot
        return{
           
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity
        }
    })

    const createOrder = new Order({
        userId,
        products:productOrder,
        totalPrice:totalPrice
    })

    await createOrder.save();
    
    res.status(200).json({message:"order is saved in DB",createOrder})

    } catch (error) {
        res.status(500).json({message:"Internal server problem"})
        console.log(error);
        
    }


   
}