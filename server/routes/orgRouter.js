const express = require('express');

const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

// const CreateOrganization = require('./user/CreateUser');
// const GetOrganization = require('./user/GetOrganization');
// const UpdateOrganization = require('./user/UpdateOrganization');
// const DeleteOrganization = require('./user/DeleteOrganization');

router.post('/', CreateUser);
router.get('/', GetUser);
router.patch('/', tokenAuth, UpdateUser);
router.delete('/', tokenAuth, DeleteUser);

module.exports = router;
