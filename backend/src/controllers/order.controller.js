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

    const order = new Order({
        userId,
        products:productOrder,
        totalPrice: totalPrice < 50 ? totalPrice + 3.5 : totalPrice,
        shippingAddress:cart.shippingAddress,
        shippingMethod:cart.shippingMethod,
        paymentMethod:cart.paymentMethod,
        
    })
    console.log(order);
    
    await order.save();
    
    //clear cart after order is created
    await Cart.findOneAndDelete({userId})   

    
    

   
    
    res.status(200).json({message:"order is saved in DB",order})

    } catch (error) {
        res.status(500).json({message:"Internal server problem"})
        console.log(error);
        
    }


   
}


export const getSingleOrder = async(req,res) => {
   
    const orderId = req.params.id;
    
    
    try {
        const order = await Order.findById(orderId).populate('products.productId');
        if(!order){
            res.status(400).json({message:"Order not found" })
            return;
        }

       //from token         //from order
        if(req.user.id !== order.userId.toString()){
            res.status(403).json({message:"Not authorized to view this order"})
            return;
        }
        
        
       let myOrder = order.products
       res.status(200).json( myOrder)  
        
    } catch (error) {
         res.status(500).json({message:"Internal server problem", error:error.message})
         return;
         
    }

}



export const getMyOrders = async(req,res) => {
    const userId = req.user.id;
    try {
        const orders = await Order.find({userId}).sort({createdAt:-1})
        if (!orders || orders.length === 0) {
            return res.status(400).json({message:"Orders not found"})
        }

       
        
        
        res.status(200).json({message:"Orders retrieved successfully", orders})

    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
        console.log(error.message);
        
    }

}

