const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      //uses session to get user id and check if user is logged in
      //either gets active cart of the given user or creates a new one
      where: {
        status: 'active',
        userId: req.session.passport.user.id
      },
      //includes info for OrderItem and Product
      include: {model: OrderItem, include: Product}
    })
    console.log('-------new cart created-------', created)

    res.json(cart)
  } catch (err) {
    next(err)
  }
})
