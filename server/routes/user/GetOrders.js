const { Order } = require('../../db/models/index');

async function GetOrders(req, res) {
    const { uid } = req.token.body;

    const orders = await Order.findAll({ where: { owner: uid } });

    return res.send({ orders });
}

module.exports = GetOrders;
