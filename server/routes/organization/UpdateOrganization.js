const { Organization } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function UpdateOrganization(req, res) {
    const { body } = req;

    // Make sure that an id is included in the request
    if (!body.id) {
        return res.status(400).send(errors.Incomplete);
    }

    const org = await Organization.findByPk(body.id);

    // Make sure that the result exists
    if (!org) {
        return res.status(404).send(errors.NotFound);
    }

    // Make sure that there are no users with that email already in the database
    if (body.name) {
        const result = await Organization.count({ where: { name: body.name } });

        if (result > 0) {
            return res.status(409).send(errors.DuplicateName);
        }
    }

    // Update the rest of the information
    org.set(body);

    try {
        // Save the update model to the database
        await org.save();

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = UpdateOrganization;
