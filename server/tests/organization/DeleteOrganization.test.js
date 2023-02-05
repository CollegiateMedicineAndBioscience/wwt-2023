const supertest = require('supertest');

const app = require('../../app');
const { sequelize, Organization } = require('../../db/models/index');
const errors = require('../../config/error.json');

const createTestOrganization = require('../utils/createTestOrganization');

describe('Delete Organization', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Organization successfully deleted', async () => {
        const org = await createTestOrganization('Test User', 'password');

        await supertest(app)
            .delete('/api/org')
            .query({ id: org.id })
            .send()
            .expect('Content-Type', /text/)
            .expect(200)
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data).toBeNull();
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .delete('/api/org')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });
});
