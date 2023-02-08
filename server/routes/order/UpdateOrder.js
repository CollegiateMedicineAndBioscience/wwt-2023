const { Order } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function UpdateOrder(req, res) {
    const { body } = req;

    const order = await Order.findByPk(body.id);

    if (!order) {
        return res.status(404).send(errors.NotFound);
    }

    order.set({ status: body.status });

    try {
        // Save the update model to the database
        await order.save();

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = UpdateOrder;
