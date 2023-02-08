const { Op } = require('sequelize');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Organization', [
            {
                name: 'Collegiate School of Medicine and Bioscience',
                address: '4939 Kemper Ave, St. Louis, MO 63139',
            },
            {
                name: 'Central Visual and Performing Arts High School',
                address: '3125 S Kingshighway Blvd, St. Louis, MO 63139',
            },
        ]);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Organization', {
            [Op.or]: [
                { name: 'Collegiate School of Medicine and Bioscience' },
                { name: 'Central Visual and Performing Arts High School' },
            ],
        });
    },
};
