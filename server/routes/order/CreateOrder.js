const { Op } = require('sequelize');

const { Order, Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateOrder(req, res) {
    const { uid } = req.token.body;
    const { ids, startDate, endDate } = req.body;

    // Verify that all of the required information is included in the request
    if (!ids || ids.length === 0) {
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

    // Check that there are no orders that are already scheduled that have that item
    const existingOrders = await Order.count({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { startDate: { [Op.lt]: startDate } },
                        { endDate: { [Op.gt]: endDate } },
                    ],
                },
                {
                    startDate: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                {
                    endDate: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            ],
        },
        include: {
            association: 'Items',
            where: {
                id: {
                    [Op.or]: ids,
                },
            },
            required: false,
        },
    });

    if (existingOrders > 0) {
        return res.status(409).send(errors.DateConflict);
    }

    try {
        // Write information to database and send success
        await Order.create({
            owner: uid,
            items: ids,
            startDate,
            endDate,
        });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = CreateOrder;
