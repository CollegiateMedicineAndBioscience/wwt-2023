module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false,
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
