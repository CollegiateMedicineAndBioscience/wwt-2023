const express = require('express');

const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateItem = require('./item/CreateItem');
const SearchItem = require('./item/SearchItem');
const UpdateItem = require('./item/UpdateItem');
const DeleteItem = require('./item/DeleteItem');

router.post('/', tokenAuth, CreateItem);
router.get('/', tokenAuth, SearchItem);
router.patch('/', tokenAuth, UpdateItem);
router.delete('/', tokenAuth, DeleteItem);

module.exports = router;
