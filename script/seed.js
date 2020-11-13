'use strict'

const db = require('../server/db')
const {User, Product, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'dog',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'law',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Jet Pack',
      description: 'a flying backpack',
      price: 123399,
      inventory: 35
      //imageUrl: 'images/products/jetpack.jpeg'
    }),
    Product.create({
      name: 'Light Saber',
      description: "a jedi's best friend",
      price: 43213299,
      inventory: 20
      // imageUrl: 'images/products/light-saber.jpg'
    }),
    Product.create({
      name: 'Laser Blaster',
      description: 'a blaster that shoots lasers',
      price: 27399,
      inventory: 100
      // imageUrl: 'images/products/laser-blaster.png'
    }),
    Product.create({
      name: 'X-Wing Battle Fighter',
      description: "a space ship that looks like an 'x'",
      price: 408822999,
      inventory: 5
      // imageUrl: 'images/products/x-wing.jpg'
    }),
    Product.create({
      name: 'Millenium Falcon',
      description: 'fastest ship around',
      price: 999999999,
      inventory: 1
      // imageUrl: 'images/products/millenium-falcon.jpg'
    }),
    Product.create({
      name: 'Hooverboard',
      description: 'a skateboard that hoovers',
      price: 1689599,
      inventory: 1000
      // imageUrl: 'images/products/hover-board.jpg'
    }),
    Product.create({
      name: 'Iron Man Suit',
      description: 'flying wearable robot suit',
      price: 258898999,
      inventory: 15
      // imageUrl: 'images/products/ironman.png'
    }),
    Product.create({
      name: 'Badassium',
      description: 'rare element developed by Tony Stark',
      price: 707288799,
      inventory: 5
      // imageUrl: 'images/products/badassium.png'
    }),
    Product.create({
      name: 'J.A.R.V.I.S',
      description: 'intellegent AI',
      price: 42399,
      inventory: 250
      // imageUrl: 'images/products/jarvis.jpg'
    }),
    Product.create({
      name: 'Anti-Gravity Device',
      description: 'will neutralize the effects of gravity',
      price: 45099,
      inventory: 50
      // imageUrl: 'images/products/anti-gravity.png'
    })
  ])

  const OrderItems = await Promise.all([
    OrderItem.create({
      status: 'active',
      price: 1000,
      quantity: 3,
      productId: 2
    }),
    OrderItem.create({
      status: 'active',
      price: 1000,
      quantity: 1,
      productId: 1
    }),
    OrderItem.create({
      status: 'completed',
      price: 1000,
      quantity: 1,
      productId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
