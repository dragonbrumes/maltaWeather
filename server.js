const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
var db = require('./app/config/db')

const app = express()
const port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    db = database.db("portfolio")
    require('./app/routes')(app, db)
})

app.listen(port, () => {
    console.log('Live on' + port)
})
