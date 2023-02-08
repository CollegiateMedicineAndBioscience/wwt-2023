const { User } = require('../../db/models/index');
const errors = require('../../config/error.json');

async function GetUser(req, res) {
    const { id } = req.query;

    const result = await User.findByPk(id);

    // Make sure that the result exists
    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    // Filter out things that shouldn't be sent to the frontend
    const { salt, password, ...rest } = result.dataValues;

    return res.send({ user: rest });
}

module.exports = GetUser;
