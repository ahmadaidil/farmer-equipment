'use strict';
var salt = require('../helpers/saltpass')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail: true,
        notEmpty: true
      }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  },{
    hooks:{
      beforeCreate: (models)=>{
        let secret = salt.genRandomString(8);
        let password = models.password
        models.password = salt.createHash(password, secret);
        models.salt = secret;
      }
    }
  });

  User.associate = models=>{
    User.belongsToMany(models.Equipment, {through: models.UserEquipment, foreignKey: 'UserId'})
  }

  return User;
};
