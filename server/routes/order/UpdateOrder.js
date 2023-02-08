const { Order } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function UpdateOrder(req, res) {
    const { uid } = req.token.body;
    const { id, status } = req.body;

    // Make sure that all required request components are present
    if (!id || !status) {
        return res.status(400).send(errors.Incomplete);
    }

    const order = await Order.findByPk(id);

    // Make sure that the order exists
    if (!order) {
        return res.status(404).send(errors.NotFound);
    }

    // Verify that the user owns that order
    if (order.owner !== uid) {
        return res.status(403).send(errors.Forbidden);
    }

    order.set({ status });

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
