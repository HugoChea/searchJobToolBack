const express = require("express");
const router = express.Router();

const { register, login } = require('../../controllers/authenticationController')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', register)

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', login)

module.exports = router;
