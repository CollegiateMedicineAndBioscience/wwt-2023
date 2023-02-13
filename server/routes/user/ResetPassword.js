const crypto = require('crypto');
const argon2 = require('argon2');

const { ResetRequest } = require('../../db/models/index');
const errors = require('../../config/error.json');

async function ResetPassword(req, res) {
    const reqID = req.params.id;
    const { password } = req.body;

    // Verify that the form contains a new password
    if (!password) {
        return res.status(400).send(errors.Incomplete);
    }

    // Confirm that there is a reset request for the user with that ID
    const result = await ResetRequest.findByPk(reqID);
    if (!result) {
        return res.status(500).send(errors.Generic);
    }

    // Salt and hash the password
    const salt = crypto.randomBytes(16);
    const passwordHash = await argon2.hash(`${password}:${salt}`);

    const user = await result.getUser();
    await user.update({ password: passwordHash, salt });
    return res.sendStatus(200);
}

module.exports = ResetPassword;
