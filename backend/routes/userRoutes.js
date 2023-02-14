const express = require('express');
const { model } = require('mongoose');
const { registerUser, getUserData, loginUser} = require('../controller/userController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser)
router.get('/me',protect, getUserData)
router.post('/login', loginUser)


module.exports = router;