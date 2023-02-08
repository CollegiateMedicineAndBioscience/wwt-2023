const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestOrganization = require('../utils/createTestOrganization');
const errors = require('../../config/error.json');

describe('Get Organization', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Organization successfully retrieved', async () => {
        const org = await createTestOrganization('Test Org');

        await supertest(app)
            .get('/api/org')
            .query({ id: org.id })
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                expect(res.body.organization).toEqual(expect.objectContaining({ id: org.id }));
                expect(res.body.organization).not.toEqual(expect.objectContaining(org));
            });
    });

    test('[404] Organization not found', async () => {
        await supertest(app)
            .get('/api/org')
            .query({ id: 'randomId' })
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
