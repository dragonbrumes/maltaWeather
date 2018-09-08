const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const MongoClient = require('mongodb').MongoClient
var db = require('./config/db')

const app = express()
const port = process.env.PORT || 8080

// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }))

// Import Routes directory
// require('./routes')(app);

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db("maltaweather")
    require('./routes')(app, db)
})

app.listen(port, () => {
    console.log('Live on: ' + port)
})
