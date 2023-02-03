const { sequelize } = require('../../db/models/index');

const basicAuth = require('../../middleware/basicAuth');
const createTestUser = require('../utils/createTestUser');
const errors = require('../../config/error.json');

const { mockRequest, mockResponse } = require('../utils/mockRequests');

describe('Password Authorization', () => {
    const next = jest.fn();

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
        jest.clearAllMocks();
    });

    test('[200] Password authentication successful', async () => {
        const testUser = await createTestUser('Test User', 'password');

        const token = new Buffer.from(`${testUser.email}:password`).toString('base64');

        const req = mockRequest({ headers: { authorization: `basic ${token}` } });
        const res = mockResponse();

        await basicAuth(req, res, next);

        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
    });

    test('[400] Request does not include header', async () => {
        const req = mockRequest({});
        const res = mockResponse();

        await basicAuth(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith(errors.Incomplete);
    });

    test('[400] Header does not include username and password', async () => {
        const token = new Buffer.from('invalidToken').toString('base64');

        const req = mockRequest({ headers: { authorization: `basic ${token}` } });
        const res = mockResponse();

        await basicAuth(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith(errors.Incomplete);
    });

    test('[403] Password does not match', async () => {
        const testUser = await createTestUser('Test User', 'password');

        const token = new Buffer.from(`${testUser.email}:wrongPassword`).toString('base64');

        const req = mockRequest({ headers: { authorization: `basic ${token}` } });
        const res = mockResponse();

        await basicAuth(req, res, next);

        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith(errors.Forbidden);
    });

    test('[404] User associated with email is not found', async () => {
        const token = new Buffer.from('username:password').toString('base64');

        const req = mockRequest({ headers: { authorization: `basic ${token}` } });
        const res = mockResponse();

        await basicAuth(req, res, next);

        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith(errors.NotFound);
    });
});
