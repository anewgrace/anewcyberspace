const Sequelize = require('sequelize')
const db = require('./database')
const crypto = require('crypto')
// const Cart = require("./cart")

const UserCG = db.define(
  'userCG',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },
    userType: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['user', 'admin']]
      },
      defaultValue: 'user'
    },
    address: {
      type: Sequelize.STRING
    }
    // cartId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Cart,
    //     key: Cart.id,
    //   },
    // },
  },
  {
    timestamps: false
  }
)

module.exports = UserCG

/**
 * instanceMethods
 */
UserCG.prototype.correctPassword = function(candidatePwd) {
  return UserCG.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
UserCG.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

UserCG.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = UserCG.generateSalt()
    user.password = UserCG.encryptPassword(user.password(), user.salt())
  }
}

UserCG.beforeCreate(setSaltAndPassword)
UserCG.beforeUpdate(setSaltAndPassword)
UserCG.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
