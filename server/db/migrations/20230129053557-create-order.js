module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            status: {
                type: Sequelize.ENUM({
                    values: ['Pending', 'Available', 'Items Recieved', 'Completed'],
                }),
                defaultValue: 'Pending',
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('orders');
    },
};
