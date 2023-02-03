const supertest = require('supertest');

const { sequelize, User } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const errors = require('../../config/error.json');

describe('Update User', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully changed user details', async () => {
        const testUser = await createTestUser('Test User', 'password');
        const testToken = createTestToken({ uid: testUser.id, expires: false, iat: Date.now() });

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send({
                email: 'new.email@test.com',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await User.findByPk(testUser.id);
                expect(data.email).toEqual('new.email@test.com');
            });
    });

    test('[409] Pre-existing user with email', async () => {
        const testUser = await createTestUser('Test User');
        const otherUser = await createTestUser('New User');
        const testToken = createTestToken({ uid: testUser.id, expires: false, iat: Date.now() });

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send({
                email: otherUser.email,
            })
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });
});
