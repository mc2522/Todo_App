const bodyParser = require('body-parser')
const path = require('path')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let todos = ["todo 1", "todo 2"]

module.exports = (app) => {

    app.get('/', (req, res) => {
        console.log("GET INVOKED")
        console.log(todos)
        res.render('index.ejs', {data: todos})
    })

    app.post('/', urlencodedParser, (req, res) => {
        console.log("POST INVOKED")
        todos.push(req.body.todo)
        console.log(todos)
        res.render('index.ejs', {data: todos})
    })

    app.delete('/:item', (req, res) => {
        console.log("DELETE INVOKED")
        todos = todos.filter(todo => todo.trim().replace(/ /g, '-') !== req.params.item)
        console.log(todos)
        res.render('index.ejs', {data: todos})
    })

    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}