const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.getCart(req.user.id)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = await Order.getCart(req.user.id)
    const addedItem = await cart.createOrderItem({
      quantity: req.body.quantity,
      productId: req.body.productId,
      price: req.body.price
    })
    console.log('added-------', addedItem)

    res.json(addedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderItemId', async (req, res, next) => {
  try {
    const cart = await Order.getCart(req.user.id)
    console.log(cart)
    if (cart.userId == req.user.id) {
      const deleted = await OrderItem.destroy({
        where: {id: req.params.orderItemId}
      })
      console.log('deleted-------', deleted)
      res.json(deleted)
    } else {
      res.send('Unauthorized action -- cannot delete this item')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderItemId', async (req, res, next) => {
  try {
    const cart = await Order.getCart(req.user.id)
    console.log(cart)
    if (cart.userId == req.user.id) {
      const updated = await OrderItem.update(
        {
          quantity: req.body.quantity
        },
        {where: {id: req.params.orderItemId}}
      )
      console.log('updated-------', updated)
      res.json(updated)
    } else {
      res.send('Unauthorized action -- cannot update this item')
    }
  } catch (err) {
    next(err)
  }
})
