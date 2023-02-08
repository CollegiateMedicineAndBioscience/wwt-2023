const { Organization } = require('../../db/models/index');
const errors = require('../../config/error.json');

async function GetOrganization(req, res) {
    const { id } = req.query;

    const result = await Organization.findByPk(id);

    // Make sure that the result exists
    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    return res.send({ organization: result });
}

module.exports = GetOrganization;