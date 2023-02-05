const express = require('express');

const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

// const CreateOrder = require('./order/CreateOrder');
const GetOrder = require('./order/GetOrder');
const DeleteOrder = require('./order/DeleteOrder');

// router.post('/', CreateOrder);
router.get('/', GetOrder);
router.delete('/', tokenAuth, DeleteOrder);

module.exports = router;
