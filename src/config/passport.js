const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/User')

passport.use(
  'login',
  new LocalStrategy(
    {
      // get input value
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      // validate Match email's user
      Users.findOne({ email })
        .then(user => {
          if (!user) {
            // si no existe usuario retorno un mensaje de error
            // done() recibe 3 parametros, un error, un user y un message
            return done(null, false, { message: 'User Not Found' })
          }

          return user
            .matchPassword(password)
            .then(matchPass =>
              matchPass
                ? done(null, user)
                : done(null, false, { message: 'Incorrect Password' })
            )
        })
        .catch(error => console.error(error))
    }
  )
)

// si el usuario se encuentra validado y registrado, se guarda la sesion para su seguimiento
passport.serializeUser((user, done) => done(null, user.id))
// cuando el usuario navegue entre paginas, passport hace una consulta a la DB
// para saber si ese usuario esta autorizado para acceder a esas paginas
passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => done(err, user))
})
