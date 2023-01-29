const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        static associate(models) {
            Organization.hasMany(models.User, {
                onDelete: 'CASCADE',
            });
        }
    }

    Organization.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, tableName: 'organizations' }
    );

    return Organization;
};
