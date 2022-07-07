const { Router } = require('express')
const { home, about } = require('../controllers/index.controllers')
const mainRoutes = Router()

mainRoutes.get('/', home)

mainRoutes.get('/about', about)

module.exports = mainRoutes
