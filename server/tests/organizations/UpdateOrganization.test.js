const supertest = require('supertest');

const { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');

const createTestOrganization = require('../utils/createTestOrganization');
const errors = require('../../config/error.json');

describe('Update Organization', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully changed organization details', async () => {
        const org = await createTestOrganization('Test Org');

        await supertest(app)
            .patch('/api/org/')
            .send({
                id: org.id,
                name: 'New Org',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data.name).toEqual('New Org');
            });
    });

    test('[409] Pre-existing organization with name', async () => {
        const org = await createTestOrganization('Test Org');
        const otherOrg = await createTestOrganization('New Org');

        await supertest(app)
            .patch('/api/org/')
            .send({
                id: org.id,
                name: otherOrg.name,
            })
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });
});
