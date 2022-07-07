const passport = require('passport')
const validateErrorsInsignup = require('../helpers/validateErrorsInsignup')
const Users = require('../models/User')

module.exports = {
  // * Login
  signinForm: (req, res) => {
    res.render('auth/signin')
  },

  signin: passport.authenticate('login', {
    failureRedirect: '/auth/signin',
    successRedirect: '/tasks',
    failureFlash: true
  }),

  // * Register
  signupForm: (req, res) => {
    res.render('auth/signup')
  },

  signup: (req, res) => {
    const { name, email, password, matchPassword } = req.body
    // deteccion de errores en el formulario de signup
    const errors = validateErrorsInsignup(email, password, matchPassword)
    const haveErrors = errors.length > 0
    // si hay errores se muestran alertas con los errores
    if (haveErrors) {
      return res.render('auth/signup', {
        errors,
        name,
        email,
        password,
        matchPassword
      })
    }

    // Verificar si el email ya se encuentra registrado
    Users.findOne({ email })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'User Is Already Registered')
          res.redirect('/auth/signin')
        }
      })
      .catch(error => console.error(error))

    // Encriptar Password
    const newUser = new Users({ name, email, password })
    newUser
      .encryptPassword(password)
      .then(encrypted => {
        newUser.password = encrypted
        // Guardar nuevo usuario en la DB
        return newUser.save()
      })
      .then(() => {
        req.flash('success_msg', 'Registered user successfully')
        res.redirect('/')
      })
      .catch(error => console.error(error))
  },

  // * Logout
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) {
        return next(err)
      }
      req.flash('success_msg', 'You Are Logged Out Now')
      res.redirect('/')
    })
  }
}
