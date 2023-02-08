const forge = require('node-forge');

async function Login(req, res) {
    const { user } = req;
    const { remember } = req.body;

    // Create the header of the token with the default headers
    const header = new Buffer.from(
        JSON.stringify({
            alg: 'SHA256',
            type: 'JWT',
        })
    ).toString('base64');

    // Create the body portion of the token
    const body = new Buffer.from(
        JSON.stringify({ uid: user.id, expires: remember, iat: Date.now() })
    ).toString('base64');

    // Combine the token with the secret key and has the result with SHA256
    const hash = forge.md.sha256.create().update(`${header}.${body}.${process.env.SECRET_KEY}`);

    return res.send({ token: `${header}.${body}.${hash.digest().toHex()}` });
}

module.exports = Login;
