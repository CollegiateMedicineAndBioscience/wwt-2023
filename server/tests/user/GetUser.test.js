const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const errors = require('../../config/error.json');

describe('Get User', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] User successfully created', async () => {
        const testUser = await createTestUser('Test User', 'password');

        await supertest(app)
            .get('/api/user')
            .query({ id: testUser.id })
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                expect(res.body.user).toEqual(expect.objectContaining({ id: testUser.id }));
                expect(res.body.user).not.toEqual(
                    expect.objectContaining({
                        password: testUser.password,
                        salt: testUser.salt,
                    })
                );
            });
    });

    test('[404] User id not found', async () => {
        await supertest(app)
            .get('/api/user')
            .query({ id: 'randomId' })
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
