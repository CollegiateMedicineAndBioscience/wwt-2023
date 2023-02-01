const forge = require('node-forge');

const config = require('../config/config.json');
const errors = require('../config/error.json');

async function tokenAuth(req, res, next) {
    const authHeader = req.get('Authorization');

    const token = authHeader?.split(' ')[1];

    const [headers, body, hash] = token.split('.');

    // Verify token is included in request
    if (!token) return res.status(400).send(errors.Incomplete);

    const decodedBody = new Buffer.from(body).toString('base64');

    // Verify token expiration
    const date = new Date();
    if (
        decodedBody.expires &&
        date.setDate(date.getDate + config.JWT_TTL) > decodedBody.createdAt
    ) {
        return res.status(440).send(errors.SessionExpired);
    }

    // Verify that the token has not been modified
    const md = forge.md.sha256.create().update(`${headers}.${body}.${process.env.SECRET_KEY}`);
    const key = md.digest().toHex();
    if (key !== hash) {
        return res.status(403).send(errors.Unauthenticated);
    }

    return next();
}

module.exports = tokenAuth;
