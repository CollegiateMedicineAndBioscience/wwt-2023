const { Order } = require('../../db/models/index');
const errors = require('../../config/error.json');

async function GetOrder(req, res) {
    const { uid } = req.token.body;
    const { id } = req.query;

    // Make sure that there is an orderId attached to the request
    if (!id) {
        return res.status(400).send(errors.Incomplete);
    }

    const order = await Order.findByPk(id, { where: { owner: uid } });

    // Return a 404 if the order is not found
    if (!order) {
        return res.status(404).send(errors.NotFound);
    }

    return res.send({ order });
}

module.exports = GetOrder;
