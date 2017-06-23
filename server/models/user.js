const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      isLowercase: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isLowercase: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      timestamps: false
    });

  User.hook('beforeCreate', (user, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) {
          reject(err);
        }
        user.password = hash;
        resolve();
      });
    });
  });

  // Instance level method
  User.prototype.comparePassword = (candidatePassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
          throw new Error();
        }
        if (isMatch)
          resolve(isMatch);
        else
          reject(new Error('The password is invalid'));
      });
    });
  };

  return User;
};