const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {
                onDelete: 'CASCADE',
            });
            Order.belongsToMany(models.Item, {
                as: 'items',
                through: 'item_orders',
            });
        }
    }

    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        { sequelize, tableName: 'orders' }
    );

    return Order;
};
