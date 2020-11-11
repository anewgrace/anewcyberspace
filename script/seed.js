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
      description: 'something new and cool',
      price: 123,
      inventory: 35
    }),
    Product.create({
      name: 'Jet Pack2',
      description: 'something new and cool2',
      price: 133,
      inventory: 1003
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
