const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.userType !== 'admin')
      res.send('ACCESS DENIED!!').status(404)
    else {
      const users = await User.findAll({
        attributes: ['id', 'email']
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})
