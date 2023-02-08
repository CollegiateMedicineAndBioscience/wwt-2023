const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.ExpiredToken, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
            User.hasOne(models.ResetRequest, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
            User.belongsTo(models.Organization, {
                onDelete: 'SET NULL',
            });
            User.hasMany(models.Item, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
            User.hasMany(models.Order, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
        }
    }

    User.init(
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
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roomNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, tableName: 'users' }
    );

    return User;
};
