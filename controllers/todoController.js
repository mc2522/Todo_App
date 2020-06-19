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

    /**
     * Post method to add a todo item to the database
     */
    app.post('/', urlencodedParser, (req, res) => {
        // save data to MongoDB database
        let todo = Todo(req.body).save((err, data) => {
            if (err) throw err
            res.json({data: data})
        })
    })

    /**
     * Delete method for when user clicks on li element (todo item) to remove it
     */
    app.delete('/:item', (req, res) => {
        // remove data from MongoDB database
        Todo.find({todo: req.params.item.trim().replace(/\-/g, ' ')}).deleteOne((err, data) => {
            if (err) throw err
            res.json({data: data})
        })
    })

    /**
     * If user goes to an invalid url, render 404 page
     */
    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}