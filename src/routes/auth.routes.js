const { Router } = require('express')
const {
  signin,
  signinForm,
  signup,
  signupForm,
  logout
} = require('../controllers/auth.controller')
const authRoutes = Router()

authRoutes.get('/auth/signin', signinForm)
authRoutes.post('/auth/new-signin', signin)
authRoutes.get('/auth/signup', signupForm)
authRoutes.post('/auth/new-signup', signup)
authRoutes.get('/auth/logout', logout)

module.exports = authRoutes
