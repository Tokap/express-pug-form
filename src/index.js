// Server Home
const BodyParser = require('body-parser')
const Express = require('express')

const App = Express()
const Db = require('./database.js')

const PORT = 3000

//  --- Set JSON & Template Configs ---
App.use(BodyParser.urlencoded({ extended: true }))
App.use(BodyParser.json())
App.use('/static', Express.static(`${__dirname}/public`))
App.set('view engine', 'pug')
App.set('views', `${__dirname}/templates`)

// --- Routes
// - Render Landing Page
App.get('/', (req, res) => res.render('landing', {}))

// - Get User
App.get('/user', async (req, res) => {
  try {
    const userDetails = Db.getFormData()
    res.status(200).json(userDetails)
  } catch (err) {
    res.status(500).json({ err: err, route: 'GET /user' })
  }
})

// - Post User
App.post('/user', async (req, res) => {})

// - Sys Alive
App.get('/sys/alive', (req, res) =>
  res.send({ status: 'Test server is running.' })
)

// --- Setup for `npm run start` command
// -Init Function
function startServer () {
  console.log(`Listening on Port: ${PORT}`)
  App.listen(PORT)
}

// - Start Server
startServer()
