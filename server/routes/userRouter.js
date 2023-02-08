const express = require('express');

const router = express.Router();

// const basicAuth = require('../middleware/basicAuth');
// const tokenAuth = require('../middleware/tokenAuth');

const CreateUser = require('./user/CreateUser');
const GetUser = require('./user/GetUser');
const UpdateUser = require('./user/UpdateUser');
const DeleteUser = require('./user/DeleteUser');
// const Login = require('./user/Login');
// const Logout = require('./user/Logout');

router.post('/', CreateUser);
router.get('/', GetUser);
router.patch('/', UpdateUser);
router.delete('/', DeleteUser);
// router.post('/login', basicAuth, Login);
// router.post('/logout', tokenAuth, Logout);

module.exports = router;
