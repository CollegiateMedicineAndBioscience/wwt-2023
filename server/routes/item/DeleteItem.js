const { Item } = require('../../db/models/Item');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function DeleteItem(req, res) {
    const { id } = req.query;
    const { uid } = req.token.body;

    if (!id) return res.status(400).send(errors.Incomplete);
    console.log(id);
}

module.exports = DeleteItem;
