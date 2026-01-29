import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();



router.post('/add',verifyToken, addToCart);



export default router;

