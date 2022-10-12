import express from 'express';

import { login, signup, verifyOtp } from '../controller/auth.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.post('/verifyotp',verifyOtp)

export default router