const supertest = require('supertest');

const { sequelize, BlacklistedToken } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');

describe('Logout', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully logged out', async () => {
        const testUser = await createTestUser('Test User', 'password');
        const testToken = createTestToken({ uid: testUser.id, expires: false, iat: Date.now() });

        await supertest(app)
            .post('/api/user/logout')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const result = await BlacklistedToken.findByPk(testToken);

                expect(result).not.toBeNull();
                expect(result.token).toEqual(testToken);
            });
    });
});
