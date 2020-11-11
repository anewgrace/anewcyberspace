const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'active',
    validate: {
      notEmpty: true,
      isIn: [['completed', 'active']]
    }
  }
})

module.exports = Order
