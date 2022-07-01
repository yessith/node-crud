const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
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
// convierte los datos que recibimos a un archivo Json para su tratamiento
app.use(express.urlencoded({ extended: false }))

// * Global Variables

// * Routes
const mainRoute = (req, res) => {
  res.render('index')
}

app.get('/', mainRoute)

// * Static Files
// se establece la rutan de donde se van a aencontrar los archivos estaticos
app.set(express.static(path.join(basePath, 'public')))

module.exports = app
