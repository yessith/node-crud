const app = require('./server')
const port = app.get('port')

app.listen(port, () =>
  console.log(`
Server on port ${port}
http://localhost:3000/
`)
)
