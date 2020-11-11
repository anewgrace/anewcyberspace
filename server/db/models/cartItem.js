const Sequelize = require('sequelize')
const db = require('./database')
const Product = require('./product')
const Cart = require('./cart')

const CartItem = db.define(
  'cartItem',
  {
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true,
        validate: {
          isInt: true
        }
      }
    },
    cartId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: Cart.id
      }
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: Product.id
      }
    }
  },
  {
    timestamps: false
  }
)

module.exports = CartItem
