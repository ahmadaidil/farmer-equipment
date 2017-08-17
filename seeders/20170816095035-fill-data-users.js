'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name:'John Doe',
      username: 'johndoe',
      password: '123',
      role:'admin',
      email:'admin@excapator.com',
      phone:'08117771999',
      address:'Jakarta',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name:'marjuki',
      username: 'juki',
      password: '123',
      role:'user',
      email:'juki@farmer.com',
      phone:'0809 89999',
      address:'Ds. Sinduri',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
