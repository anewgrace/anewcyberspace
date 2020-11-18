const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  console.log('authorizing....')
  if (!req.user.id) {
    console.log('..not authorized--try signing in')
    res.send('NOT SIGNED IN').status(403)
  } else if (req.user.userType !== 'admin') {
    console.log('..not authorized--must be admin')
    res.send('INTRUDER ALERT! NOT AN ADMIN!').status(403)
  } else {
    console.log('you have been authorized')
    next()
  }
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:singleProductId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.singleProductId)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

//post
router.post('/', isAdmin, async (req, res, next) => {
  const {body} = req
  const {name, description, imageUrl, price, inventory} = body
  const product = await Product.create({
    name,
    description,
    imageUrl,
    price,
    inventory
  })
  res.json(product)
})

//delete
router.delete('/:productId', isAdmin, async (req, res, next) => {
  const deleted = await Product.destroy({
    where: {id: req.params.productId}
  })
  console.log('deleted-------', deleted)
  deleted == 1 && res.json(deleted)
  res.json(deleted)
})

//update - price, name, description, inventory, imageURL, etc.
router.put('/:productId', isAdmin, async (req, res, next) => {
  const updated = await Product.update(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory
    },
    {
      where: {id: req.params.productId}
    }
  )
  console.log('updated-------', updated)
  updated == 1 && res.json(updated)
  res.json(updated)
})
