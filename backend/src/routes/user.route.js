import express from 'express';
import { forgotPassword, login, register, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/signout', signout)
router.post('/forgot-password', forgotPassword)

export default router;