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

// SIMILAR ROUTE TO MERGE GUEST CART WITH USER CART
// IF INPUT ARRAY IS NOT EMPTY, CREATE ITEMS --- ELSE, NOTHING HAPPENS.

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.send('NOT SIGNED IN').status(403)
    }
    const cart = await Order.getCart(req.user.id)

    const addedItem = await cart.createOrderItem({
      quantity: req.body.quantity,
      productId: req.body.id,
      price: req.body.price
    })

    res.json(addedItem)
  } catch (err) {
    next(err)
  }
})

router.post('/merge', async (req, res, next) => {
  try {
    if (!req.user) {
      res.send('NOT SIGNED IN').status(403)
    }
    const cart = await Order.getCart(req.user.id)
    if (cart.dataValues.OrderItems && cart.dataValues.OrderItems.length) {
      req.body.orderItems.map(orderItem => {
        cart.dataValues.OrderItems.map(async cartItem => {
          if (orderItem.id === cartItem.productId) {
            await OrderItem.update(
              {quantity: orderItem.quantity},
              {where: {id: cartItem.id}}
            )
          } else {
            await cart.createOrderItem({
              quantity: orderItem.quantity,
              productId: orderItem.id,
              price: orderItem.price
            })
          }
        })
      })
    } else {
      req.body.orderItems.map(async orderItem => {
        await cart.createOrderItem({
          quantity: orderItem.quantity,
          productId: orderItem.id,
          price: orderItem.price
        })
      })
    }

    res.send('Success!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderItemId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.send('NOT SIGNED IN').status(403)
    }
    const cart = await Order.getCart(req.user.id)

    if (cart.userId == req.user.id) {
      const deleted = await OrderItem.destroy({
        where: {id: req.params.orderItemId}
      })
      console.log('deleted-------', deleted)
      deleted == 1 && res.json(deleted)
    } else {
      res.send('Unauthorized action -- cannot delete this item')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const cart = await Order.getCart(req.user.id)

      if (cart.userId == req.user.id) {
        const updated = await Order.update(
          {status: 'completed'},
          {
            where: {id: req.body.orderId},
            returning: true
          }
        )
        console.log('updated-------', updated)
        res.json(updated)
      }
    } else {
      res.send('Unauthorized action -- cannot update this item')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderItemId', async (req, res, next) => {
  console.log('_____________PUT ROUTE WAS HIT____________')
  try {
    if (!req.user) {
      res.send('NOT SIGNED IN').status(403)
    }
    const cart = await Order.getCart(req.user.id)

    if (cart.userId == req.user.id) {
      const updated = await OrderItem.update(
        {quantity: req.body.quantity},
        {
          where: {id: req.params.orderItemId},
          returning: true
        }
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
