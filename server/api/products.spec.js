/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const name = 'laser gun'
    const description = 'gun that shoots lasers'
    const price = 3333
    beforeEach(() => {
      return Product.create({
        name: name,
        description: description,
        price: price
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
      // expect(res.body[0].imageUrl).to.be.equal('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU')
      expect(res.body[0].inventory).to.be.equal(0)
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
