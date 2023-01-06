module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tokens', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            expires: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('tokens');
    },
};