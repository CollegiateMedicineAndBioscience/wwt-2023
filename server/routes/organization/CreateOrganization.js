const { Organization } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateOrganization(req, res) {
    const { body } = req;

    const { name, address } = body;

    // Verify that all of the required information is included in the request
    if (!name || !address) {
        return res.status(400).send(errors.Incomplete);
    }

    // Make sure that there are no users with that address already in the database
    const existing = await Organization.count({ where: { name } });

    if (existing > 0) {
        return res.status(409).send(errors.DuplicateName);
    }

    try {
        // Write information to database and send success
        await Organization.create({ name, address });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = CreateOrganization;
