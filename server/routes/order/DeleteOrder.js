const { Order } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function DeleteOrder(req, res) {
    const { id } = req.query;
    const { body } = req.token;

    // Make sure that there is an orderId attached to the request
    if (!id) {
        return res.status(400).send(errors.Incomplete);
    }

    const order = await Order.findByPk(id);

    // Return a 404 if the order is not found
    if (!order) {
        return res.status(404).send(errors.NotFound);
    }

    // Check if the owner is the same as the person requesting deletion
    if (order.owner !== body.uid) {
        return res.status(403).send(errors.Forbidden);
    }

    try {
        // Delete the order from the database
        await order.destroy();

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = DeleteOrder;
