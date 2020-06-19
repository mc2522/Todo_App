const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

// middleware for POST
const urlencodedParser = bodyParser.urlencoded({extended: false})
// uri for mongoDB database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@data-stno8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// connect to MongoDB database
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const todoSchema = new mongoose.Schema({
    todo: String
}) 

const Todo = mongoose.model('Todo', todoSchema)
let itemOne = Todo({todo: 'get groceries'}).save(err => {
    if (err) console.log(err)
    console.log('todo saved')
})

// array of todos to display
let todos = ["todo 1", "todo 2"]

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index.ejs', {data: todos})
    })

    app.post('/', urlencodedParser, (req, res) => {
        todos.push(req.body.item)
        res.json({data: todos})
    })

    app.delete('/:item', (req, res) => {
        todos = todos.filter(todo => todo.trim().replace(/ /g, '-') !== req.params.item)
        res.json({data: todos})
    })

    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}