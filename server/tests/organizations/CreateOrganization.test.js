const supertest = require('supertest');

const { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');

const createTestOrganization = require('../utils/createTestOrganization');
const errors = require('../../config/error.json');

describe('Create Organization', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Organization successfully created', async () => {
        const org = { name: 'Test Org', address: 'randomAddress' };

        await supertest(app)
            .post('/api/org/')
            .send(org)
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Organization.findOne({ where: { name: org.name } });
                expect(data.name).toEqual(org.name);
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/org/')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[409] Organization with that name already exists', async () => {
        await createTestOrganization('Test Org');

        await supertest(app)
            .post('/api/org/')
            .send({ name: 'Test Org', address: 'randomAddress' })
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });
});
