const { Item } = require('../../db/models/index');

async function GetInventory(req, res) {
    const { uid } = req.token.body;

    const items = await Item.findAll({ where: { owner: uid } });

    return res.send({ items });
}

module.exports = GetInventory;
