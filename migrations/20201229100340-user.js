'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {   
    await queryInterface.createTable('users', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      cpassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type:Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
    await queryInterface.createTable('items', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },         
          userId: {
              type: Sequelize.INTEGER,
              foreignKey: true,
              references: {
                  model: 'users',//must be plural of model name
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
            type: Sequelize.INTEGER,
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
    })
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.dropTable('users'),
    await queryInterface.dropTable('items')
  }
};
