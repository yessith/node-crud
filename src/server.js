'use strict'
const express = require('express')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const mainRouter = require('./routes/index.routes')
const taskRouter = require('./routes/tasks.routes')

const basePath = __dirname
const app = express()

// * Setting
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(basePath, 'views'))

// * Template Engine
const viewsPath = app.get('views')

const configEngine = {
  defaultLayout: 'main',
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
  extname: '.hbs'
}

app.engine('.hbs', handlebars.create(configEngine).engine)
app.set('view engine', '.hbs')

// * Middleware
// guarde los datos que se reciben dentro de un archivo Json para su tratamiento
app.use(express.urlencoded({ extended: false }))
// morgan registrar solicitudes y errores HTTP
app.use(morgan('dev'))
// methodOverride permite usar verbos HTTP como PUT o DELETE en lugares donde el cliente no lo admite.
app.use(methodOverride('_method'))
// express-session se usa para configurar y trabajar con sesiones de usuarios y cookies
app.use(
  session({
    secret: 'tasksSecret',
    resave: true,
    saveUninitialized: true
  })
)
// permite mostrar mensajes  de información en la pantalla bajo ciertas condiciones.
app.use(flash())

// * Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  next()
})

// * Routes
app.use(mainRouter)
app.use(taskRouter)

// * Static Files
// se establece la rutan de donde se van a aencontrar los archivos estaticos
app.use(express.static(path.join(basePath, 'public')))

module.exports = app
