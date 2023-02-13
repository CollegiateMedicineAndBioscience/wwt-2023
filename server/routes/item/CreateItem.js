const { Op } = require('sequelize');

const { Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateItem(req, res) {
    const { uid } = req.token.body;
    const { names } = req.body;
    // Make sure ids do exist
    if (!names || names.length === 0) {
        return res.status(404).send(errors.NotFound);
    }

    // Making sure input names is an array
    if (!Array.isArray(names)) {
        return res.status(400).send(errors.Incomplete);
    }

    // Getting items in req into format for bulkCreate
    const items = [];
    let item = { };

    for (let i = 0; i < names.length; i += 1) {
        item = {
            owner: uid,
            name: names[i],
        };
        items.push(item);
    }

    try {
        await Item.bulkCreate(
            items,
        );
        // Send 200 if sucsesfull
        return res.sendStatus(200);
    } catch (e) {
        logger.error(e);
        // Send 500 if something goes wrong
        return res.status(500).send(errors.Generic);
    }
}

module.exports = CreateItem;
