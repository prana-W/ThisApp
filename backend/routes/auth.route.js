const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);

module.exports = router;
