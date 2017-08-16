'use strict';
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
    address: DataTypes.STRING
  });

  User.associate = models=>{
    User.belongsToMany(models.Equipment, {through: models.UserEquipment})
  }

  return User;
};
