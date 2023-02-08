const { Item } = require('../../db/models/index');

async function createTestItem(body) {
    return Item.create(body);
}

module.exports = createTestItem;
