const Sequelize = require('sequelize')
const db = require('./database')
const UserCG = require('./userCG')
const CartItem = require('./cartItem')

const Cart = db.define(
  'cart',
  {
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
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: UserCG,
        key: UserCG.id
      }
    },
    cartItemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CartItem,
        key: CartItem.id
      }
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cart
