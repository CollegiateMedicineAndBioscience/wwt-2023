const express = require('express');

const router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const CreateUser = require('./user/CreateUser');
const GetUser = require('./user/GetUser');
const UpdateUser = require('./user/UpdateUser');
const DeleteUser = require('./user/DeleteUser');

const Login = require('./user/Login');
const Logout = require('./user/Logout');

const RequestPasswordReset = require('./user/RequestPasswordReset');
const ResetPassword = require('./user/ResetPassword');

const GetInventory = require('./user/GetInventory');
const GetOrders = require('./user/GetOrders');

router.post('/', CreateUser);
router.get('/', GetUser);
router.patch('/', tokenAuth, UpdateUser);
router.delete('/', tokenAuth, DeleteUser);

router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);

router.post('/reset', RequestPasswordReset);
router.patch('/reset/:id', ResetPassword);

router.get('/inventory', tokenAuth, GetInventory);
router.get('/orders', tokenAuth, GetOrders);

module.exports = router;
