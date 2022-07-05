const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
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
app.use(morgan('dev'))
app.use(methodOverride('_method'))

// * Global Variables

// * Routes
app.use(mainRouter)
app.use(taskRouter)

// * Static Files
// se establece la rutan de donde se van a aencontrar los archivos estaticos
app.use(express.static(path.join(basePath, 'public')))

module.exports = app
