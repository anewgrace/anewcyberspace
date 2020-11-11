const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'active',
    validate: {
      notEmpty: true,
      isIn: [['completed', 'active']]
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

module.exports = CartItem
