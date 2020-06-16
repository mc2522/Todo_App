const bodyParser = require('body-parser')
const path = require('path')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('../views/index.ejs')
    })

    app.post('/', urlencodedParser, (req, res) => {
        
    })

    app.delete('/', (req, res) => {

    })

    app.use((req, res) => {
        res.status(404)
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

}