const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const createTestOrder = require('../utils/createTestOrder');

describe('Get Orders', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Orders successfully retrieved', async () => {
        const user = await createTestUser('Test User', 'password');
        const token = createTestToken({ iat: Date.now(), uid: user.id, expires: false });
        const order = await createTestOrder({
            owner: user.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });

        await supertest(app)
            .get('/api/user/orders')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                expect(res.body.orders).toEqual(
                    expect.arrayContaining([expect.objectContaining({ id: order.id })])
                );
            });
    });
});
