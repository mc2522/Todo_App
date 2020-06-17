const bodyParser = require('body-parser')
const path = require('path')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const todos = ["sample1", "sample2"]

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index.ejs', {data: todos})
    })

    app.post('/', urlencodedParser, (req, res) => {
        todos.push(req.body.todo)
        res.render('index.ejs', {data: todos})
    })

    app.delete('/', (req, res) => {

    })

    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}