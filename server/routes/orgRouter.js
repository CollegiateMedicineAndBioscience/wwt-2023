const express = require('express');

const router = express.Router();

const CreateOrganization = require('./organization/CreateOrganization');
const GetOrganization = require('./organization/GetOrganization');
const UpdateOrganization = require('./organization/UpdateOrganization');
const DeleteOrganization = require('./organization/DeleteOrganization');

router.post('/', CreateOrganization);
router.get('/', GetOrganization);
router.patch('/', UpdateOrganization);
router.delete('/', DeleteOrganization);

module.exports = router;
