'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    edition: DataTypes.STRING,
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    reviews: DataTypes.STRING,
    coverArt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};