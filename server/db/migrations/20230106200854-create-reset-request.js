module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reset_requests', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
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
        await queryInterface.dropTable('reset_requests');
    },
};