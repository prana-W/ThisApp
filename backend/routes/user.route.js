import express from 'express';
const router = express.Router();
import { getUserFromDB, getAllUsersFromDB } from '../controllers/user.controller.js';

router.get('/', getAllUsersFromDB);
router.get('/:username', getUserFromDB); //returns the user

export default router;
