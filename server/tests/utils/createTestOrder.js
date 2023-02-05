const { Order } = require('../../db/models/index');

async function createTestOrder(body) {
    return Order.create(body);
}

module.exports = createTestOrder;
