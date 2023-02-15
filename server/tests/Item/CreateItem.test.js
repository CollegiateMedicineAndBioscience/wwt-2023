const supertest = require('supertest');

const { sequelize, Item } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const errors = require('../../config/error.json');

describe('Create Item', () => {
    let owner;
    let token;
    const namesd = 'microscope';

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });

        owner = await createTestUser('Test User', 'password');
        token = createTestToken({ uid: owner.id, expires: false, iat: Date.now() });
    });

    test('[200] Items successfully created', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ name: namesd, quantity: 5 })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Item.findAll({ where: { owner: owner.id } });
                expect(data.length).toEqual(5);
            });
    });

    test('[400] Quantity is negative', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ name: 'hello', quantity: -3 })
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Quantity is zero', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ name: 'hello', quantity: 0 })
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Quantity is wrongly typed', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ name: 'hello', quantity: '-2' })
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Name is wrongly typed', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ name: 0, quantity: 0 })
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });
});
