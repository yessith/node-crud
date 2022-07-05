const { Router } = require('express')
const { home, about } = require('../controllers/index.controllers')
const mainRouter = Router()

mainRouter.get('/', home)

mainRouter.get('/about', about)

module.exports = mainRouter
