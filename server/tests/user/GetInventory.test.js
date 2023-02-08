const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const createTestItem = require('../utils/createTestItem');

describe('Get Inventory', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Inventory successfully retrieved', async () => {
        const user = await createTestUser('Test User', 'password');
        const token = createTestToken({ iat: Date.now(), uid: user.id, expires: false });
        const item = await createTestItem({ name: 'Microscope', owner: user.id });

        await supertest(app)
            .get('/api/user/inventory')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                expect(res.body.items).toEqual(
                    expect.arrayContaining([expect.objectContaining({ id: item.id })])
                );
            });
    });
});
