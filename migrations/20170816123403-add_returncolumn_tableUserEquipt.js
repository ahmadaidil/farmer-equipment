'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEquipments', 'Returned', Sequelize.BOOLEAN)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserEquipments', 'Returned')
  }
};
