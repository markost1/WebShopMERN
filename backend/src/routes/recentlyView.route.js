import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addRecentlyViewed, getRecentlyViewed } from '../controllers/recentlyView.controller.js';


const router = express.Router();

router.post('/', verifyToken, addRecentlyViewed ) 
router.get('/', verifyToken, getRecentlyViewed )


export default router;

