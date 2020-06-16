const express = require('express')
const app = express()

const todoController = require('./controllers/todoController')
const PORT = 3000

// template engine for rendering
app.set('view engine', 'ejs');

// static files (styles.css)
app.use(express.static('./public'))

// run controller
todoController(app)

app.listen(PORT)
console.log("listening to port 3000")