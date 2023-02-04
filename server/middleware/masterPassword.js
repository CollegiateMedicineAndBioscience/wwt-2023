const errors = require('../config/error.json');

async function masterPassword(req, res, next) {
    // Make sure that the authorization header exists
    if (!req.headers || !req.headers.authorization) {
        return res.status(400).send(errors.Incomplete);
    }

    // Verify master password is included in request
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(400).send(errors.Incomplete);

    // Validate master password
    if (token !== process.env.MASTER_PASSWORD) {
        return res.status(403).send(errors.Forbidden);
    }

    return next();
}

module.exports = masterPassword;
