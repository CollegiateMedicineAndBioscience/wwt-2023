const supertest = require('supertest');

const { sequelize, Order } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const createTestItem = require('../utils/createTestItem');
const createTestOrder = require('../utils/createTestOrder');
const errors = require('../../config/error.json');

describe('Create Order', () => {
    let owner;
    let token;

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        owner = await createTestUser('Test User', 'password');
        token = createTestToken({ uid: owner.id, expires: false, iat: Date.now() });
    });

    test('[200] Order successfully created', async () => {
        const itemOne = await createTestItem({ name: 'Item One' });
        const itemTwo = await createTestItem({ name: 'Item Two' });

        await supertest(app)
            .post('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send({ ids: [itemOne.id, itemTwo.id], startDate: Date.now(), endDate: Date.now() })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Order.findOne({ where: { owner: owner.id } });
                expect(data).not.toBeNull();
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] Some items are not found', async () => {
        const itemOne = await createTestItem({ name: 'Item One' });

        await supertest(app)
            .post('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send({ ids: [itemOne.id, 'randomId'], startDate: Date.now(), endDate: Date.now() })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[409] An item is already taken during that time', async () => {
        const itemOne = await createTestItem({ name: 'Item One' });
        const itemTwo = await createTestItem({ name: 'Item Two' });
        await createTestOrder({
            items: [itemOne.id],
            startDate: Date.now() - 1500,
            endDate: Date.now() + 1500,
        });

        await supertest(app)
            .post('/api/order')
            .set('Authorization', `bearer ${token}`)
            .send({ ids: [itemOne.id, itemTwo.id], startDate: Date.now(), endDate: Date.now() })
            .expect('Content-Type', /json/)
            .expect(409, errors.DateConflict);
    });
});
