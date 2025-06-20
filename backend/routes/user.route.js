import express from 'express';
const router = express.Router();
import { getUserFromDB } from '../controllers/user.controller.js';

router.get('/user/:username', (req, res) => {}); //returns the user

export default router;
