'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name:'Michelle',
      username: 'michelle',
      password: '9fcefb4132848f73eae07b92f248913e52bbe760cc45c595cfa312ad0589e65e',
      role:'admin',
      email:'admin@excapator.com',
      phone:'08117771999',
      address:'Jakarta',
      createdAt: new Date(),
      updatedAt: new Date(),
      salt:'f1720d46'
    }, {
      name:'Dwi',
      username: 'dwi',
      password: '20a4fac8c4951396bd6489e28ca1b5d972a0406f2f1f9ae8bfbd6765f7fe0356',
      role:'user',
      email:'juki@farmer.com',
      phone:'0809 89999',
      address:'Ds. Sinduri',
      createdAt: new Date(),
      updatedAt: new Date(),
      salt: '9ef5b518'
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
