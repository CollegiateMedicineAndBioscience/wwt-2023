const { Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateItem(req, res) {
    const { uid } = req.token.body;
    const { name, quantity } = req.body;

    // Make sure fields exist and have content
    if ((!name || name.length === 0) || (!quantity || quantity < 0)) {
        return res.status(400).send(errors.Incomplete);
    }

    // Getting items in req into format for bulkCreate
    const items = [];
    let item = { };
    for (let i = 0; i < quantity; i += 1) {
        item = {
            owner: uid,
            name,
        };
        items.push(item);
    }

    // Making the actual bulk create
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
