const express = require('express');

const router = express.Router();

const CreateOrganization = require('./organizations/CreateOrganization');
const GetOrganization = require('./organizations/GetOrganization');
const UpdateOrganization = require('./organizations/UpdateOrganization');
const DeleteOrganization = require('./organizations/DeleteOrganization');

router.post('/', CreateOrganization);
router.get('/', GetOrganization);
router.patch('/', UpdateOrganization);
router.delete('/', DeleteOrganization);

module.exports = router;
