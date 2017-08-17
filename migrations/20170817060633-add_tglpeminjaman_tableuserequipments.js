'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEquipments', 'TglPeminjaman', Sequelize.DATE)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserEquipments', 'TglPeminjaman')
  }
};
