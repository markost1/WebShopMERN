import express from 'express';
import { forgotPassword, login, register, resendVertificationEmail, resetPassword, signout, verifyEmail } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/signout', signout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/verify-email/:token',verifyEmail)
router.post('/resend-verification-email',resendVertificationEmail)

export default router;