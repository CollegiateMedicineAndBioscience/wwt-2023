const argon2 = require('argon2');

const { User } = require('../db/models/index');
const errors = require('../config/error.json');

async function basicAuth(req, res, next) {
    const { headers } = req;

    if (!headers) return res.status(400).send(errors.Incomplete);

    const { authorization } = headers;

    const b64Encoded = authorization?.split(' ')[1];

    if (!b64Encoded) return res.status(400).send(errors.Incomplete);

    // Isolate username and password
    const [email, password] = Buffer.from(b64Encoded, 'base64').toString().split(':');
    if (!email || !password) return res.status(400).send(errors.Incomplete);

    // Make sure that a user exists with that email
    const result = await User.findOne({
        where: { email },
    });
    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    // Hash the password and verify that the user hash is identical
    const passwordHash = await argon2.verify(result.password, `${password}:${result.salt}`);

    if (!passwordHash) {
        return res.status(403).send(errors.Forbidden);
    }

    req.user = result;
    return next();
}

module.exports = basicAuth;
