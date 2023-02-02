const { Op } = require('sequelize');

const { Token } = require('../db/models/index');
const logger = require('./logger');
const config = require('../config/config.json');

async function clearTokenBlacklist() {
    logger.info('Deleting expired tokens from blacklist.');

    const date = new Date();

    await Token.destroy({
        where: {
            createdAt: {
                [Op.gt]: date.setDate(date.getDate - config.JWT_TTL),
            },
        },
    });
}

module.exports = { clearTokenBlacklist };
