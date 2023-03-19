'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('users', [{
      firstName: 'toooooo',
      lastName: 'toooooo',
      username: 'toooooo',
      email: 'toooooo',
      password: 'toooooo',
      favorite: ['jjjjj 4', 'jjjjj 5', 'jjjjj 6'],
      read: ['jjjjj 4', 'jjjjj 5', 'jjjjj 6'],
      tbr: ['jjjjj 4', 'jjjjj 5', 'jjjjj 6'],
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
