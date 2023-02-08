const forge = require('node-forge');

function createTestToken(body, secret = '') {
    const encodedHeader = new Buffer.from(
        JSON.stringify({
            alg: 'SHA256',
            type: 'JWT',
        })
    ).toString('base64');

    const encodedBody = new Buffer.from(JSON.stringify(body)).toString('base64');

    if (secret) {
        return `${encodedHeader}.${encodedBody}.${secret}`;
    }

    const md = forge.md.sha256
        .create()
        .update(`${encodedHeader}.${encodedBody}.${process.env.SECRET_KEY}`);

    return `${encodedHeader}.${encodedBody}.${md.digest().toHex()}`;
}

module.exports = createTestToken;
