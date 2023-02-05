const { Op } = require('sequelize');
const crypto = require('crypto');
const argon2 = require('argon2');

const { User } = require('../../db/models/index');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function UpdateUser(req, res) {
    const { body, token } = req;

    const user = await User.findByPk(token.body.uid);

    if (!user) {
        return res.status(404).send(errors.NotFound);
    }

    // Make sure that there are no users with that email already in the database
    if (body.email) {
        const result = await User.count({
            where: {
                [Op.and]: {
                    email: body.email,
                    id: { [Op.not]: user.id },
                },
            },
        });

        if (result > 0) {
            return res.status(409).send(errors.DuplicateName);
        }

        user.set({ email: body.email });
    }

    // Salt and hash the password if it was changed
    if (body.password) {
        const salt = crypto.randomBytes(16);
        const passwordHash = await argon2.hash(`${body.password}:${salt}`);

        user.set({ salt, password: passwordHash });
    }

    // Filter out information that has already been changed
    const { email, password, ...rest } = body;

    // Update the rest of the information
    user.set({ ...rest });

    try {
        // Save the update model to the database
        await user.save();

        return res.sendStatus(200);
    } catch (e) {
        // Catch database write error if it occurs and log to file
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = UpdateUser;
