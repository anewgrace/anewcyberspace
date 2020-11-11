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

const CartItem = require('./cartItem')
const Product = require('./product')
const User = require('./user')

User.belongsToMany(CartItem, {through: 'Carts'})
CartItem.belongsToMany(User, {through: 'Carts'})

CartItem.hasOne(Product)
Product.belongsTo(CartItem)

module.exports = {
  db,
  CartItem,
  Product,
  User
}
