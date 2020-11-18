const Sequelize = require('sequelize')
const OrderItem = require('./orderItem')
const Product = require('./product')
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

//class method to getCart
Order.getCart = async function(userId) {
  const [cart, created] = await Order.findOrCreate({
    where: {
      status: 'active',
      userId
    },
    //includes info for OrderItem and Product
    include: {model: OrderItem, include: Product}
  })
  return cart
}

module.exports = Order
