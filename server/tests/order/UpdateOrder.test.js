const supertest = require('supertest');

const app = require('../../app');
const { sequelize, Order } = require('../../db/models/index');
const errors = require('../../config/error.json');

const createTestUser = require('../utils/createTestUser');
const createTestOrder = require('../utils/createTestOrder');
const createTestToken = require('../utils/createTestToken');

describe('Update Order', () => {
    let owner;
    let token;

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        owner = await createTestUser('Test User', 'password');
        token = createTestToken({ uid: owner.id, expires: false, iat: Date.now() });
    });

    test('[200] Order successfully updated', async () => {
        const order = await createTestOrder({
            owner: owner.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });

        await supertest(app)
            .patch('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send({ id: order.id, status: 'Completed' })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Order.findByPk(order.id);
                expect(data.status).toEqual('Completed');
            });
    });

    test('[404] Order not found', async () => {
        const invalidToken = createTestToken({ uid: 'randomId', expires: false, iat: Date.now() });
        const order = await createTestOrder({
            owner: owner.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });

        await supertest(app)
            .patch('/api/order')
            .set('Authorization', `bearer ${invalidToken}`)
            .send({ id: order.id, status: 'Completed' })
            .expect('Content-Type', /json/)
            .expect(403, errors.Forbidden);
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .patch('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] Order not found', async () => {
        await supertest(app)
            .patch('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send({ id: 'randomId', status: 'Completed' })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
