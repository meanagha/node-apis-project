module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },         
        userId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rent_price: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        actual_price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        rent_status: {
          type: Sequelize.STRING,
          allowNull: false,
        },  
        manufacture_date: {
            type: Sequelize.STRING,
            allowNull: false
        },   
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
    });

    Item.associate = function(models) {
        Item.belongsTo(models.user, {
        as: 'items',
        foreignKey: 'userId',
      })     
    };
    return Item;
  };
