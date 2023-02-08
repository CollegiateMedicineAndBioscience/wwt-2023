module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('orders');
    },
};
