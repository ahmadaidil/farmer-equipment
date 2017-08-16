'use strict';
module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define('Equipment', {
    name_attr: DataTypes.STRING,
    spec: DataTypes.STRING
  });

  Equipment.associate = models=>{
    Equipment.belongsToMany(models.User, {through: models.UserEquipment})
  }

  return Equipment;
};
