const { User } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function DeleteUser(req, res) {
    const { token } = req;

    try {
        // Delete the user from the database
        await User.destroy({ where: { id: token.body.uid } });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = DeleteUser;
