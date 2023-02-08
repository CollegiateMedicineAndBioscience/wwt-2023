const { Organization } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function DeleteOrganization(req, res) {
    const { id } = req.query;

    // Make sure that an id is included in the request
    if (!id) {
        return res.status(400).send(errors.Incomplete);
    }

    try {
        // Delete the user from the database
        await Organization.destroy({ where: { id } });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = DeleteOrganization;
