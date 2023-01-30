module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_items', {
            order: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            item: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('order_items');
    },
};
