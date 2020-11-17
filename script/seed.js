'use strict'

const db = require('../server/db')
const {User, Product, OrderItem, Order} = require('../server/db/models')

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
    }),
    User.create({
      firstName: 'alex',
      lastName: 'esp',
      email: 'alex@email.com',
      password: '123',
      userType: 'admin'
    }),
    User.create({
      firstName: 'keaton',
      lastName: 'shoe',
      email: 'keaton@email.com',
      password: '123',
      userType: 'admin'
    }),
    User.create({
      firstName: 'max',
      lastName: 'riv',
      email: 'max@email.com',
      password: '123',
      userType: 'admin'
    }),
    User.create({
      firstName: 'luke',
      lastName: 'skywalker',
      email: 'luke@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'leah',
      lastName: 'skywalker',
      email: 'leah@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'anikan',
      lastName: 'skywalker',
      email: 'ani@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'darthvador',
      lastName: 'sith',
      email: 'vador@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'tony',
      lastName: 'stark',
      email: 'ironman@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'peter',
      lastName: 'parker',
      email: 'spiderman@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'thor',
      lastName: 'odenson',
      email: 'thor@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'captain',
      lastName: 'america',
      email: 'captn@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'bruce',
      lastName: 'wayne',
      email: 'batman@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'clark',
      lastName: 'kent',
      email: 'superman@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'yoda',
      lastName: 'mynameis',
      email: 'yoda@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'han',
      lastName: 'solo',
      email: 'han@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'chewy',
      lastName: 'wookie',
      email: 'chewy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'r2d2',
      lastName: 'drone',
      email: 'r2d2@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Jet Pack',
      description: 'a flying backpack',
      price: 123399,
      inventory: 35,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/jetpack.jpeg'
    }),
    Product.create({
      name: 'Light Saber',
      description: "a jedi's best friend",
      price: 43213299,
      inventory: 20,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/light-saber.jpg'
    }),
    Product.create({
      name: 'Laser Blaster',
      description: 'a blaster that shoots lasers',
      price: 27399,
      inventory: 100,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/laser-blaster.png'
    }),
    Product.create({
      name: 'X-Wing Fighter',
      description: 'x-shaped space ship',
      price: 408822999,
      inventory: 5,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/x-wing.jpg'
    }),
    Product.create({
      name: 'Millenium Falcon',
      description: 'fastest ship around',
      price: 999999999,
      inventory: 1,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/millenium-falcon.jpg'
    }),
    Product.create({
      name: 'Hooverboard',
      description: 'a skateboard that hoovers',
      price: 1689599,
      inventory: 1000,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/hover-board.jpg'
    }),
    Product.create({
      name: 'Iron Man Suit',
      description: 'flying wearable robot suit',
      price: 258898999,
      inventory: 15,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/ironman.png'
    }),
    Product.create({
      name: 'Badassium',
      description: 'rare element developed by Tony Stark',
      price: 707288799,
      inventory: 5,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/badassium.png'
    }),
    Product.create({
      name: 'J.A.R.V.I.S',
      description: 'intellegent AI',
      price: 42399,
      inventory: 250,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/jarvis.jpg'
    }),
    Product.create({
      name: 'Anti-Gravity Device',
      description: 'will neutralize the effects of gravity',
      price: 45099,
      inventory: 50,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/anti-gravity.png'
    }),
    Product.create({
      name: 'Iron Man Suit',
      description: 'flying wearable robot suit',
      price: 258898999,
      inventory: 15,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/ironman.png'
    }),
    Product.create({
      name: 'Badassium',
      description: 'rare element developed by Tony Stark',
      price: 707288799,
      inventory: 5,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/badassium.png'
    }),
    Product.create({
      name: 'J.A.R.V.I.S',
      description: 'intellegent AI',
      price: 42399,
      inventory: 250,
      imageUrl: 'http://cybergrace.herokuapp.com/Images/products/jarvis.jpg'
    }),
    Product.create({
      name: 'Anti-Gravity Device',
      description: 'will neutralize the effects of gravity',
      price: 45099,
      inventory: 50,
      imageUrl:
        'http://cybergrace.herokuapp.com/Images/products/anti-gravity.png'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: 'active',
      userId: 1
    }),
    Order.create({
      status: 'active',
      userId: 2
    }),
    Order.create({
      status: 'active',
      userId: 5
    }),
    Order.create({
      status: 'active',
      userId: 6
    }),
    Order.create({
      status: 'active',
      userId: 7
    })
  ])

  const orderItems = await Promise.all([
    OrderItem.create({
      price: 333399,
      quantity: 3,
      productId: 5,
      orderId: 5
    }),
    OrderItem.create({
      price: 333399,
      quantity: 3,
      productId: 8,
      orderId: 5
    }),
    OrderItem.create({
      price: 333399,
      quantity: 3,
      productId: 2,
      orderId: 5
    }),
    OrderItem.create({
      price: 333399,
      quantity: 1,
      productId: 2,
      orderId: 4
    }),
    OrderItem.create({
      price: 333399,
      quantity: 1,
      productId: 6,
      orderId: 3
    }),
    OrderItem.create({
      price: 333399,
      quantity: 1,
      productId: 7,
      orderId: 3
    }),
    OrderItem.create({
      price: 333399,
      quantity: 1,
      productId: 1,
      orderId: 3
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orderItems.length} order items`)
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
