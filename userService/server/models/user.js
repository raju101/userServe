'use strict';
const {
  Model
} = require('sequelize');
var crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    validPassword(passwordFromUser) {
      var hash = crypto.pbkdf2Sync(passwordFromUser,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
      return this.password === hash;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */                 
    static associate(models) {
      // define association here
    }
  };
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    salt: "",
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          user.salt = crypto.randomBytes(16).toString('hex');
          user.password = crypto.pbkdf2Sync(user.password, user.salt, 1000, 64, `sha512`).toString(`hex`);
        },
      }
  });
  return user;
};
