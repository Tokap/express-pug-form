// Server Home
const BodyParser = require('body-parser')
const Express = require('express')

const App = Express()
const Db = require('./database.js')

const PORT = 3000

//  --- Set JSON & Template Configs ---
App.use(BodyParser.urlencoded({ extended: true }))
App.use(BodyParser.json())
App.use('/static', Express.static(__dirname + '/public'))
App.set('view engine', 'pug')
App.set('views', __dirname + '/templates')

// --- Routes

// - Render Landing Page

// - Get User

// - Post User

// - Sys Alive

// --- Setup for `npm run start` command

// - Init Function

// - Start Server
