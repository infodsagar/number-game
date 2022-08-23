const express = require('express');

const router = express.Router();

const { loginUser, signupUser } = require('../controllers/userController');

router.post('/', loginUser);

router.post('/', signupUser);

module.exports = router;
