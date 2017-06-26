const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

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

  // Hooks
  User.hook('beforeCreate', (user) => {
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

  // Class Method
  User.getTokenForUser = function (user) {
    const timestamp = new Date().getTime();
    return jwt.encode({
      sub: user.id,
      iat: timestamp,
      exp: new Date().getTime() + 60 * 3 * 1000 // expires in 3 hours from now
    }, process.env.JWT_SECRET);
  }


  User.registerUser = async function (username, email, password) {
    try {
      let newUser = await this.create({ username, email, password }, { fields: ['username', 'email', 'password'] });
      return this.getTokenForUser(newUser);
    }
    catch (err) {
      throw new Error('Problem registering user!')
    }
  };

  // Instance Method
  User.prototype.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
          throw new Error(err.message);
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