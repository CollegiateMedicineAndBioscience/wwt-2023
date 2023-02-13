const supertest = require('supertest');

const { sequelize, User } = require('../../db/models/index');
const app = require('../../app');
const errors = require('../../config/error.json');

const createTestUser = require('../utils/createTestUser');

describe('Reset Password', () => {
    let user;
    let resetRequest;

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        user = await createTestUser('Test User', 'password');
        resetRequest = await user.createResetRequest();
    });

    test('[200] Successful reset password', async () => {
        await supertest(app)
            .patch(`/api/user/reset/${resetRequest.id}`)
            .send({
                password: 'newPassword',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const result = await User.findByPk(user.id);

                expect(result.salt).not.toEqual(user.salt);
                expect(result.password).not.toEqual(user.password);
            });
    });

    test('[400] Missing password', async () => {
        await supertest(app)
            .patch(`/api/user/reset/${resetRequest.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[500] Reset request does not exist', async () => {
        await supertest(app)
            .patch('/api/user/reset/randomString')
            .send({
                password: 'newPassword',
            })
            .expect('Content-Type', /json/)
            .expect(500, errors.Generic);
    });
});
