const { BlacklistedToken } = require('../../db/models/index');
const logger = require('../../utils/logger');
const errors = require('../../config/error.json');

async function Logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];

    try {
        // Add the token to the blacklist and send success
        await BlacklistedToken.create({ token });

        return res.sendStatus(200);
    } catch (error) {
        // Catch database write error if it occurs and log to file
        logger.error(errors);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = Logout;
