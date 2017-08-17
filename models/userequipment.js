'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserEquipment = sequelize.define('UserEquipment', {
    UserId: DataTypes.INTEGER,
    EquipmentId: DataTypes.INTEGER,
    TglPeminjaman: DataTypes.DATE,
    TglPengembalian: DataTypes.DATE,
    Qty: DataTypes.INTEGER,
    Approved: DataTypes.BOOLEAN,
    Returned: DataTypes.BOOLEAN,
    Removed: DataTypes.BOOLEAN
  });

  UserEquipment.associate = models=>{
    UserEquipment.belongsTo(models.User)
    UserEquipment.belongsTo(models.Equipment)
  }

  return UserEquipment;
};
