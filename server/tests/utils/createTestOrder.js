const { Order } = require('../../db/models/index');

async function createTestOrganization(body) {
    return Order.create(body);
}

module.exports = createTestOrganization;
