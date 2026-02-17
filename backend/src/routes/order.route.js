import express from 'express';
import { createOrder, getMyOrders, getSingleOrder } from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router =  express.Router()


router.post('/',verifyToken, createOrder)
router.get('/my-orders',verifyToken,getMyOrders)
router.get('/:id',verifyToken,getSingleOrder)









export default router;