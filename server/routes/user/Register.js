const crypto = require('crypto');
const argon2 = require('argon2');

const { User } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function Register(req, res) {
    const { body } = req;

    // Verify that all of the required information is included in the request
    if (!body.email || !body.password) {
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

module.exports = Register;
