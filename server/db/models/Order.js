const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {
                onDelete: 'CASCADE',
            });
            Order.belongsToMany(models.Item, {
                foreignKey: 'order',
                through: 'order_items',
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
