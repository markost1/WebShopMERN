import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminmiddleware } from '../middlewares/adminMiddleware.js';
import { createCategory } from '../controllers/category.controller.js';

const router = express.Router();


router.post('/create',verifyToken,adminmiddleware, createCategory)


export default router;