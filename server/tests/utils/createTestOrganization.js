const { Organization } = require('../../db/models/index');

async function createTestOrganization(name) {
    return Organization.create({
        name,
        address: '9 Test Street',
    });
}

module.exports = createTestOrganization;
