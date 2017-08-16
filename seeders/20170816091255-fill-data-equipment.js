'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Equipment', [{
      name_attr: 'traktor',
      spec: 'Komatsu 200',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Equipment', null, {})
  }
};
