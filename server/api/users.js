const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.send('NOT SIGNED IN').status(404)
    } else if (req.session.passport.user.userType !== 'admin')
      res.send('INTRUDER ALERT! NOT AN ADMIN!').status(404)
    else {
      const users = await User.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName'],
        include: {model: Order, include: OrderItem}
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})
