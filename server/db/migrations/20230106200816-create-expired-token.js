module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('expired_tokens', {
            token: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('expired_tokens');
    },
};
