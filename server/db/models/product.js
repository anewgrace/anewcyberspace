const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU',
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
