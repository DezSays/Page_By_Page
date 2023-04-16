'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('users', [{
      firstName: 'Init',
      lastName: 'Init',
      username: 'Init',
      email: 'Init@gmail.com',
      password: 'Init',
      favorite: ['Init 4', 'Init 5', 'Init 6'],
      read: ['Init 4', 'Init 5', 'Init 6'],
      tbr: ['Init 4', 'Init 5', 'Init 6'],
      createdAt: new Date,
      updatedAt: new Date
     }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
