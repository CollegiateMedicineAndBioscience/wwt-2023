const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExpiredToken extends Model {
        static associate(models) {
            ExpiredToken.belongsTo(models.User, {
                onDelete: 'CASCADE',
            });
        }
    }

    ExpiredToken.init(
        {
            token: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
        },
        { sequelize, tableName: 'tokens' }
    );

    return ExpiredToken;
};
