const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: 'owner',
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
            startDate: { type: DataTypes.DATE, allowNull: false },
            endDate: { type: DataTypes.DATE, allowNull: false },
            status: {
                type: DataTypes.ENUM({
                    values: ['Pending', 'Available', 'Items Recieved', 'Completed'],
                }),
                defaultValue: 'Pending',
            },
        },
        { sequelize, tableName: 'orders' }
    );

    return Order;
};
