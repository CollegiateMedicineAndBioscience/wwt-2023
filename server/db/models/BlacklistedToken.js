const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BlacklistedToken extends Model {
        static associate(models) {
            BlacklistedToken.belongsTo(models.User, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
        }
    }

    BlacklistedToken.init(
        {
            token: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
        },
        { sequelize, tableName: 'blacklisted_tokens' }
    );

    return BlacklistedToken;
};
