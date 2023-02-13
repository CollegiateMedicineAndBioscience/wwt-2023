const supertest = require('supertest');

const { sequelize, Item } = require('../../db/models/index');
const app = require('../../app');

const createTestUser = require('../utils/createTestUser');
const createTestToken = require('../utils/createTestToken');
const errors = require('../../config/error.json');

describe('Create Item', () => {
    let owner;
    let token;
    const namesd = ['microscope', 'miniscope', 'big_scope', 'miniscope'];

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
            .send({ names: namesd })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Item.findOne({ where: { owner: owner.id } });
                expect(data).not.toBeNull();
                const dataCount = await Item.count({ where: { owner: owner.id } });
                expect(dataCount === namesd.length);
            });
    });

    test('[404] Item names not in array', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send({ names: 'hello' })
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[400] Item names not included', async () => {
        await supertest(app)
            .post('/api/item')
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
