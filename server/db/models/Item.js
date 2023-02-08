const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.belongsTo(models.User, {
                foreignKey: 'owner',
                onDelete: 'CASCADE',
            });
            Item.belongsToMany(models.Order, {
                foreignKey: 'item',
                through: 'order_items',
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
