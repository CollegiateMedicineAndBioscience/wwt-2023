const { Op } = require('sequelize');

const { Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateItem(req, res) {
    const { uid } = req.token.body;
    const { names } = req.body;
    // Make sure ids do exist
    if (!names || names.length === 0) {
        return res(404).send(errors.NotFound);
    }
    // Creating the items
    try { // bad this needs to be checked
        await Item.bulkCreate({
            owner: uid,
            name: names,
        });

        return res.sendStatus(200);
    } catch (e) {
        logger.error(e);

        return res(500).send(errors.Generic);
    }
}

module.exports = CreateItem;
