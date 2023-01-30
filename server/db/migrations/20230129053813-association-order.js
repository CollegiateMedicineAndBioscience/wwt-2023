module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('orders', 'owner', {
            type: Sequelize.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('orders', 'owner');
    },
};
