const errors = require('../../config/error.json');

async function UpdateItem(req, res) {
    return res.status(404).send(errors.Forbidden);
}

module.exports = UpdateItem;
