const supertest = require('supertest');

const { sequelize, ResetRequest } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const errors = require('../../config/error.json');

describe('Request Reset', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successful reset request', async () => {
        const user = await createTestUser('Test User', 'password');

        await supertest(app)
            .post('/api/user/reset')
            .send({ email: user.email })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await ResetRequest.findOne({ where: { owner: user.id } });
                expect(data).not.toBeNull();
            });
    });

    test('[400] Request missing email', async () => {
        await supertest(app)
            .post('/api/user/reset')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] No user with email', async () => {
        await supertest(app)
            .post('/api/user/reset')
            .send({ email: 'randomString' })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
