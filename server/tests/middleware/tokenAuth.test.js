const { sequelize, BlacklistedToken } = require('../../db/models/index');

const tokenAuth = require('../../middleware/tokenAuth');
const errors = require('../../config/error.json');
const config = require('../../config/config.json');

const createTestToken = require('../utils/createTestToken');
const createTestUser = require('../utils/createTestUser');
const { mockRequest, mockResponse } = require('../utils/mockRequests');

describe('Token Authorization', () => {
    const next = jest.fn();

    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
        jest.clearAllMocks();
    });

    test('[200] Valid token passes', async () => {
        const testUser = await createTestUser('Test User', 'password');
        const testToken = createTestToken({ uid: testUser.id, expires: false, iat: Date.now() });

        const req = mockRequest({ headers: { authorization: `bearer ${testToken}` } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
    });

    test('[400] Request does not include token', async () => {
        const req = mockRequest({});
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith(errors.Incomplete);
    });

    test('[400] Token does not include required segments', async () => {
        const req = mockRequest({ headers: { authorization: 'bearer randomString' } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith(errors.BadToken);
    });

    test('[403] Token has been modified', async () => {
        const testToken = createTestToken(
            {
                uid: 'testId',
                expires: false,
                iat: Date.now(),
            },
            'randomHash'
        );

        const req = mockRequest({ headers: { authorization: `bearer ${testToken}` } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith(errors.Forbidden);
    });

    test('[403] Token does not contain all necesary components', async () => {
        const testToken = createTestToken({
            uid: 'testId',
        });

        const req = mockRequest({ headers: { authorization: `bearer ${testToken}` } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith(errors.BadToken);
    });

    test('[440] Token is expired', async () => {
        const date = new Date();
        const testToken = createTestToken({
            uid: 'testId',
            expires: true,
            iat: date.setDate(date.getDate() - 2 * config.JWT_TTL),
        });

        const req = mockRequest({ headers: { authorization: `bearer ${testToken}` } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(440);
        expect(res.send).toBeCalledWith(errors.SessionExpired);
    });

    test('[440] Token is included in blacklist', async () => {
        const testToken = createTestToken({
            uid: 'testId',
            expires: false,
            iat: Date.now(),
        });
        await BlacklistedToken.create({ token: testToken });

        const req = mockRequest({ headers: { authorization: `bearer ${testToken}` } });
        const res = mockResponse();

        await tokenAuth(req, res, next);

        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith(errors.SessionExpired);
    });
});
