const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');

describe('Login', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully logged in', async () => {
        const testUser = await createTestUser('Test User', 'password');

        const hashedCredentials = new Buffer.from(`${testUser.email}:password`).toString('base64');

        await supertest(app)
            .post('/api/user/login')
            .set('Authorization', `basic ${hashedCredentials}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                const body = res.body.token.split('.')[1];

                const decodedBody = JSON.parse(new Buffer.from(body, 'base64'));

                expect(decodedBody.uid).toEqual(testUser.id);
            });
    });
});
