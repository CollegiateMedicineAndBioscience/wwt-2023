const express = require('express');

const router = express.Router();

const masterPassword = require('../middleware/masterPassword');

const CreateOrganization = require('./organizations/CreateOrganization');
const GetOrganization = require('./organizations/GetOrganization');
const UpdateOrganization = require('./organizations/UpdateOrganization');
const DeleteOrganization = require('./organizations/DeleteOrganization');

router.post('/', masterPassword, CreateOrganization);
router.get('/', GetOrganization);
router.patch('/', masterPassword, UpdateOrganization);
router.delete('/', masterPassword, DeleteOrganization);

module.exports = router;
