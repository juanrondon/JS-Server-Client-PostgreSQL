'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('Users',
      {
        id: {
          type: Sequelize.INTEGER,
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
