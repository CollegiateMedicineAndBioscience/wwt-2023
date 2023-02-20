const { Op } = require('sequelize');

const { Item } = require('../../db/models/Item');
const errors = require('../../config/error.json');
const logger = require('../../utils/logger');

async function DeleteItem(req, res) {
    const { ids } = req.query;
    const { uid } = req.token.body;

    // Make sure that there is a id in the request
    if (!ids || ids.length === 0) {
        return res.status(400).send(errors.NotFound);
    }

    // Making sure items exist
    const itemCount = await Item.findAll({
        where: {
            [Op.and]: [
                {
                    id: {
                        [Op.in]: ids
                    },
                },
                {
                    owner: uid
                },
            ]
        }
    });

    // Make sure all items are found and are owned by person submitting deletion req
    if (itemCount.length !== ids.length) {
        return res.status(404).send(errors.NotFound);
    }

    //  deletion of records matching in array of ids
    try {
        await Item.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });

        return res.sendStatus(200);
    } catch (e) {
        logger.error(e);

        return res.status(500).send(errors.Generic);
    }
}

module.exports = DeleteItem;
