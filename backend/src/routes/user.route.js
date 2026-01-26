import express from 'express';
import { adminTest, forgotPassword, login, register, resendVertificationEmail, resetPassword, signout, verifyEmail, verifyTokenTest } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminmiddleware } from '../middlewares/adminMiddleware.js';


const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/signout', signout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/verify-email/:token',verifyEmail)
router.post('/resend-verification-email',resendVertificationEmail)

router.post('/test',verifyToken, verifyTokenTest)
router.post('/admin-test',verifyToken,adminmiddleware,adminTest)

export default router;