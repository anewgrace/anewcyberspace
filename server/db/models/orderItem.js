const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('OrderItem', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      isInt: true
    }
  }
})

module.exports = OrderItem
