const express = require('express')
const path = require('path')
const basePath = __dirname

// * Initialization
const app = express()

// * Setting

// * Port Server
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(basePath, 'views'))

// * Middleware
// convierte los datos que recibimos a un archivo Json para su tratamiento
app.use(express.urlencoded({ extended: false }))

// * Global Variables

// * Routes
const handleServer = (req, res) => {
  res.send('<h1>Hola mundo, mi primer server con express que emocion</h1>')
}

app.get('/', handleServer)

// * Static Files
// se establece la rutan de donde se van a aencontrar los archivos estaticos
app.set(express.static(path.join(basePath, 'public')))

module.exports = app
