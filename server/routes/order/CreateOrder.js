const { Op } = require('sequelize');

const { Order, Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateOrder(req, res) {
    const { body } = req.body.token;
    const { ids } = req.body;

    // Verify that all of the required information is included in the request
    if (!ids || ids.length() === 0) {
        return res.status(400).send(errors.Incomplete);
    }

    // Make sure that all of the items exist
    const itemCount = await Item.count({
        where: {
            id: {
                [Op.or]: ids,
            },
        },
    });

    if (itemCount !== ids.length) {
        return res.status(404).send(errors.NotFound);
    }

    // Make sure that none of the items are already included in an order
    const orderCount = await Order.count(0);

    try {
        // Write information to database and send success
        await Order.create({ owner: body.uid, items: ids });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = CreateOrder;
