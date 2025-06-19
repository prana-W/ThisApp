const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginUser); // logs the user
router.post('/register', registerUser); //register a new user
router.get('/logout', logoutUser); // logs out the user

module.exports = router;
