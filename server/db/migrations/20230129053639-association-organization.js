module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'organization', {
            type: Sequelize.UUID,
            references: {
                model: 'organizations',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('user', 'organization');
    },
};
