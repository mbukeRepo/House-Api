const express = require('express');
const { login,signup } = require('../controllers/authController');
const router = express.Router();


// POST /api/v1/login
// this route is for logging user in and issuing token 

router.post('/login', login );


// POST /api/v1/signup
// this route is for creating new  user and issuing token(automatic login) 

router.post('/signup', signup );


module.exports = router;