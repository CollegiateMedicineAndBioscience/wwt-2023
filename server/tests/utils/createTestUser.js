const crypto = require('crypto');
const argon2 = require('argon2');

const { User } = require('../../db/models/index');

async function createTestUser(name, password) {
    // Salt and hash the password
    const salt = crypto.randomBytes(16);
    const passwordHash = await argon2.hash(`${password}:${salt}`);

    const userInfo = {
        name,
        email: `${name.replace(' ', '.').toLowerCase()}@test.com`,
        phoneNumber: '000-000-0000',
        roomNumber: '000',
        salt,
        password: passwordHash,
    };

    return User.create(userInfo);
}

module.exports = createTestUser;
