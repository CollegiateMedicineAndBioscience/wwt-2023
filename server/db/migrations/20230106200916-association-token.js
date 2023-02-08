module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('expired_tokens', 'owner', {
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
        await queryInterface.removeColumn('expired_tokens', 'owner');
    },
};
