const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const errors = require('../../config/error.json');
const config = require('../../config/config.json');

describe('Update User Details', () => {
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
            .expect(200, 'OK');
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

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .patch('/api/user/')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Token does not include required segments', async () => {
        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.BadToken);
    });

    test('[403] Token has been modified', async () => {
        const testToken = createTestToken(
            {
                uid: 'testId',
                expires: false,
                iat: Date.now(),
            },
            'randomHash'
        );

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403, errors.Forbidden);
    });

    test('[403] Token does not contain all necesary components', async () => {
        const testToken = createTestToken(
            {
                uid: 'testId',
                expires: false,
                iat: Date.now(),
            },
            'randomHash'
        );

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403, errors.Forbidden);
    });

    test('[440] Token is expired', async () => {
        const date = new Date();
        const testToken = createTestToken({
            uid: 'testId',
            expires: true,
            iat: date.setDate(date.getDate() - 2 * config.JWT_TTL),
        });

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(440, errors.SessionExpired);
    });

    test('[440] Token is expired', async () => {
        const date = new Date();
        const testToken = createTestToken({
            uid: 'testId',
            expires: true,
            iat: date.setDate(date.getDate() - 2 * config.JWT_TTL),
        });

        await supertest(app)
            .patch('/api/user/')
            .set('Authorization', `bearer ${testToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(440, errors.SessionExpired);
    });
});
