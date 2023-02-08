const express = require('express');

const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateOrder = require('./order/CreateOrder');
const GetOrder = require('./order/GetOrder');
const UpdateOrder = require('./order/UpdateOrder');
const DeleteOrder = require('./order/DeleteOrder');

router.post('/', tokenAuth, CreateOrder);
router.get('/', tokenAuth, GetOrder);
router.patch('/', tokenAuth, UpdateOrder);
router.delete('/', tokenAuth, DeleteOrder);

module.exports = router;
