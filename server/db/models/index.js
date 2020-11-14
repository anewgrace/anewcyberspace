// const User = require('./user') //commented out from original boilerplate

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const db = require('../db')

const OrderItem = require('./orderItem')
const Product = require('./product')
const User = require('./user')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)

module.exports = {
  db,
  OrderItem,
  Product,
  User,
  Order
}
