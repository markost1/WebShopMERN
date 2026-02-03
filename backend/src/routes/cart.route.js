import express from 'express';
import { addToCart, decreaseQuantity, getCart, increaseQuantity, removeFromCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();


router.get('/',verifyToken, getCart);
router.post('/add',verifyToken, addToCart);
router.delete('/remove/:productId', verifyToken, removeFromCart)
router.put('/increase/:productId',verifyToken, increaseQuantity);
router.put('/decrease/:productId',verifyToken, decreaseQuantity);



export default router;

