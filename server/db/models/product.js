const Sequelize = require('sequelize')
const db = require('./database')

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
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      notEmpty: true
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
