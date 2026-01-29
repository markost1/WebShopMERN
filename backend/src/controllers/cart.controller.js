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