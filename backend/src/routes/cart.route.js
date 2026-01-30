import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();


router.get('/',verifyToken, getCart);
router.post('/add',verifyToken, addToCart);
router.delete('/remove/:productId', verifyToken, removeFromCart)



export default router;

