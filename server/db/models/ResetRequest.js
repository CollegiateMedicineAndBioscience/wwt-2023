const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ResetRequest extends Model {
        static associate(models) {
            ResetRequest.belongsTo(models.User, {
                onDelete: 'CASCADE',
            });
        }
    }

    ResetRequest.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        { sequelize, tableName: 'reset_requests' },
    );

    return ResetRequest;
};