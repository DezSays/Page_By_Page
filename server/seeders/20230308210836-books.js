'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('books', [{
      title: 'oh hi',
      description: 'oh hi',
      edition: 'oh hi',
      isbn: 'oh hi',
      author: 'oh hi',
      pages: 5,
      rating: 2,
      reviews: 'oh hi',
      coverArt: 'oh hi',
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
