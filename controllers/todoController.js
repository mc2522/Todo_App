const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const { response } = require('express')
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

module.exports = (app) => {

    app.get('/', (req, res) => {
        // find data from MongoDB data and render 
        Todo.find({}, (err, data) => {
            if (err) throw err
            res.render('index.ejs', {data: data})
        })
    })

    app.post('/', urlencodedParser, (req, res) => {
        console.log(req.body)
        let todo = Todo(req.body).save((err, data) => {
            if (err) throw err
            res.json({data: data})
        })
    })

    app.delete('/:item', (req, res) => {
        console.log(req.params.item.trim().replace(/ /g, ' '))
        Todo.find({todo: req.params.item.trim().replace(/\-/g, ' ')}).deleteOne((err, data) => {
            if (err) throw err
            res.json({data: data})
        })
    })

    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}