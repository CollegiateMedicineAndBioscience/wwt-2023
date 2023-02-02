const forge = require('node-forge');

const { User, ExpiredToken } = require('../db/models/index');

const config = require('../config/config.json');
const errors = require('../config/error.json');

async function tokenAuth(req, res, next) {
    // Make sure that the authorization header exists
    if (!req.headers || !req.headers.authorization) {
        return res.status(400).send(errors.Incomplete);
    }

    // Verify token is included in request
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(400).send(errors.Incomplete);

    // Verify that the token has all of the required segments
    const [headers, body, hash] = token.split('.');
    if (!headers || !body || !hash) {
        return res.status(400).send(errors.BadToken);
    }

    // Verify that the token has not been modified
    const md = forge.md.sha256.create().update(`${headers}.${body}.${process.env.SECRET_KEY}`);
    const key = md.digest().toHex();
    if (key !== hash) {
        return res.status(403).send(errors.Forbidden);
    }

    const decodedBody = JSON.parse(new Buffer.from(body, 'base64'));

    // Verify that the body contains all necessary components
    if (!decodedBody.iat || !decodedBody.uid) {
        return res.status(400).send(errors.BadToken);
    }

    // Verify token expiration
    const date = new Date();
    if (decodedBody.expires && date.setDate(date.getDate() - config.JWT_TTL) > decodedBody.iat) {
        return res.status(440).send(errors.SessionExpired);
    }

    // Check if that token is included in a blacklist
    const expiredToken = await ExpiredToken.findByPk(hash);

    if (expiredToken) {
        return res.status(403).send(errors.SessionExpired);
    }

    const result = await User.findByPk(decodedBody.uid);

    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    req.user = result;

    return next();
}

module.exports = tokenAuth;
