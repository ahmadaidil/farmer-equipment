'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserEquipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      EquipmentId: {
        type: Sequelize.INTEGER
      },
      TglPengembalian: {
        allowNull:false,
        type: Sequelize.DATE,
        validate:{
          notEmpty: true,
          isDate: true,
          isBefore: new Date()
        }
      },
      Qty: {
        type: Sequelize.INTEGER,
        validate:{
          isInt: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserEquipments');
  }
};
