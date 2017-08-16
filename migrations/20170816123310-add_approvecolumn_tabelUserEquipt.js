'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEquipments', 'Approved', Sequelize.BOOLEAN)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserEquipments', 'Approved')
  }
};
