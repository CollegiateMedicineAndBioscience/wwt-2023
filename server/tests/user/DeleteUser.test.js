const supertest = require('supertest');

const { sequelize, User } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');

describe('Delete User', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] User successfully deleted', async () => {
        const testUser = await createTestUser('Test User', 'password');
        const testToken = createTestToken({ uid: testUser.id, expires: false, iat: Date.now() });

        await supertest(app)
            .delete('/api/user')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200)
            .then(async () => {
                const data = await User.findByPk(testUser.id);
                expect(data).toBeNull();
            });
    });
});
