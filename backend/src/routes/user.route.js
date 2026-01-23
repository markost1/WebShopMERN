import express from 'express';
import { forgotPassword, login, register, resetPassword, signout, verifyEmail } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/signout', signout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/verify-email/:token',verifyEmail)

export default router;