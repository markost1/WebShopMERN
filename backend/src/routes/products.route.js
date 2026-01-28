import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminmiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts)
router.get('/:id',getSingleProduct)
router.post('/create', verifyToken, adminmiddleware, createProduct)
router.put('/update/:id', verifyToken, adminmiddleware, updateProduct)
router.delete('/delete/:id',verifyToken,adminmiddleware,deleteProduct)



export default router;
