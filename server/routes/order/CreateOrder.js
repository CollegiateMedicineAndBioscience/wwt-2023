const crypto = require('crypto');
const argon2 = require('argon2');

const { Order, Item } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function CreateOrder(req, res) {
    const { body } = req.body.token;
    const { items } = req.body;

    // Verify that all of the required information is included in the request
    if (!items || items.length() === 0) {
        return res.status(400).send(errors.Incomplete);
    }

    // Make sure that there are no users with that email already in the database
    const existingUsers = await User.count({
        where: {
            email: body.email,
        },
    });

    if (existingUsers > 0) {
        return res.status(409).send(errors.DuplicateUser);
    }

    // Make sure that the organization exists
    const organization = await Organization.findByPk(orgId);

    if (!organization) {
        return res.status(404).send(errors.NotFound);
    }

    // Salt and hash the password
    const salt = crypto.randomBytes(16);
    const passwordHash = await argon2.hash(`${body.password}:${salt}`);

    try {
        // Write information to database and send success
        await User.create({ ...body, salt, password: passwordHash });

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = CreateOrder;
