const supertest = require('supertest');

const app = require('../../app');
const { sequelize } = require('../../db/models/index');
const errors = require('../../config/error.json');

const createTestUser = require('../utils/createTestUser');
const createTestOrder = require('../utils/createTestOrder');
const createTestToken = require('../utils/createTestToken');

describe('Get Order', () => {
    let owner;
    let token;

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        owner = await createTestUser('Test User', 'password');
        token = createTestToken({ uid: owner.id, expires: false, iat: Date.now() });
    });

    test('[200] Order successfully retrieved', async () => {
        const order = await createTestOrder({
            owner: owner.id,
            startDate: Date.now(),
            endDate: Date.now(),
        });

        await supertest(app)
            .get('/api/order')
            .set('Authorization', `bearer ${token}`)
            .query({ id: order.id })
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (res) => {
                expect(res.body.order).toEqual(expect.objectContaining({ id: order.id }));
                expect(res.body.order.status).toEqual('Pending');
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .get('/api/order')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] Order not found', async () => {
        await supertest(app)
            .get('/api/order')
            .set('Authorization', `bearer ${token}`)
            .query({ id: 'randomId' })
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
