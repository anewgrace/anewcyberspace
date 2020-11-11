const Sequelize = require('sequelize')
const db = require('./database')

const CartItem = db.define('cartItem', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'active',
    validate: {
      notEmpty: true,
      validate: {
        isIn: [['completed', 'active']]
      }
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      validate: {
        isInt: true
      }
    }
  }
})

module.exports = CartItem
