import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);

export default router;
