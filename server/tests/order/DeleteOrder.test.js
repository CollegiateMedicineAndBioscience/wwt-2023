const supertest = require('supertest');

const app = require('../../app');
const { sequelize, Order } = require('../../db/models/index');
const errors = require('../../config/error.json');

const createTestToken = require('../utils/createTestToken');
const createTestOrder = require('../utils/createTestOrder');
const createTestUser = require('../utils/createTestUser');

describe('Delete Order', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Order successfully deleted', async () => {
        const owner = await createTestUser('Test User', 'password');
        const order = await createTestOrder({
            owner: owner.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });
        const token = createTestToken({ uid: owner.id, expires: true, iat: Date.now() });

        await supertest(app)
            .delete('/api/order')
            .set('Authorization', `bearer ${token}`)
            .query({ id: order.id })
            .send()
            .expect('Content-Type', /text/)
            .expect(200)
            .then(async () => {
                const data = await Order.findByPk(order.id);
                expect(data).toBeNull();
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .delete('/api/order')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[403] Order is not owned by user', async () => {
        const owner = await createTestUser('Test User', 'password');
        const order = await createTestOrder({
            owner: owner.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });
        const token = createTestToken({ uid: 'randomId', expires: true, iat: Date.now() });

        await supertest(app)
            .delete('/api/order')
            .set('Authorization', `bearer ${token}`)
            .query({ id: order.id })
            .send()
            .expect('Content-Type', /json/)
            .expect(403)
            .then(async () => {
                const data = await Order.findByPk(order.id);
                expect(data).not.toBeNull();
            });
    });
});
