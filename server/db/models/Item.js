const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.belongsTo(models.User, {
                onDelete: 'CASCADE',
            });
            Item.belongsToMany(models.Order, {
                as: 'orders',
                through: 'item_orders',
            });
        }
    }

    Item.init(
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
            notes: { type: DataTypes.STRING },
        },
        { sequelize, tableName: 'items' }
    );

    return Item;
};
