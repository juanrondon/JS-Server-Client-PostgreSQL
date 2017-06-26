'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('Users',
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'user_id',
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          isLowercase: true,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          isLowercase: true,
          unique: true,
          isEmail: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
      });
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
