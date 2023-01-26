const express = require('express');

const router = express.Router();

// const basicAuth = require('../middleware/basicAuth');
// const tokenAuth = require('../middleware/tokenAuth');

const Register = require('./user/Register');
// const Login = require('./user/Login');
// const Logout = require('./user/Logout');

router.post('/register', Register);
// router.post('/login', basicAuth, Login);
// router.post('/logout', tokenAuth, Logout);

module.exports = router;
