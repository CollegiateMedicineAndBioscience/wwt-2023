const supertest = require('supertest');

const { sequelize, User } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestOrganization = require('../utils/createTestOrganization');
const errors = require('../../config/error.json');

describe('Create User', () => {
    let testOrg;

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        testOrg = await createTestOrganization('Test Org');
    });

    test('[200] User successfully created', async () => {
        const user = {
            name: 'Test User',
            email: 'test.user@test.com',
            orgId: testOrg.id,
            roomNumber: 400,
            phoneNumber: '999-999-9999',
            password: 'password',
        };

        await supertest(app)
            .post('/api/user')
            .send(user)
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await User.findOne({ where: { email: user.email } });
                expect(data.email).toEqual(user.email);
            });
    });

    test('[404] User not found with that ID', async () => {
        const user = {
            name: 'Test User',
            email: 'test.user@test.com',
            orgId: 'nonexistent-id',
            roomNumber: 400,
            phoneNumber: '999-999-9999',
            password: 'password',
        };

        await supertest(app)
            .post('/api/user')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/user')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[409] User with that email already exists', async () => {
        await createTestUser('Test User', 'password');
        const user = {
            name: 'Test User',
            email: 'test.user@test.com',
            orgId: 'nonexistent-id',
            roomNumber: 400,
            phoneNumber: '999-999-9999',
            password: 'password',
        };

        await supertest(app)
            .post('/api/user')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateUser);
    });
});
