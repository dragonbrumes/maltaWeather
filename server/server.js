const express = require('express')
// XHR library to fetch api data
const fetch = require('node-fetch')
// json library
const bodyParser = require('body-parser')
const path = require('path');
const MongoClient = require('mongodb').MongoClient
var db = require('./config/db')
const apiRoutes = require('./routes/routes')

const app = express()
const port = process.env.PORT || 8080

app.use('/routes', apiRoutes)
// in case we need Cors
// var cors = require('cors')
// app.use(cors())

// configure header of requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }))

// Import Routes directory
// require('./routes')(app);

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db("maltaweather")
    require('./routes')(app, db)
})

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../', 'client/build')));

//fetch CURRENT weather route. Add to put it before the catchAll route for React
app.get('/api/weather/:units', (req, res, next) => {
    var units = req.params.units;
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?id=2562305';
    const apiId = '&appid=87c58a605846f73484361aef29c5c4fb&units=' + units;
    const apiUrl = (baseUrl + apiId)

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            res.send({ data });
            // res.send(console.log({ data }));
        })
        .catch(err => {
            // res.redirect('/error');
            res.send(console.log(err))
            res.send(err)
        });
})


//fetch FORECAST weather route. Add to put it before the catchAll route for React
app.get('/api/forecast/:units', (req, res, next) => {
    var units = req.params.units;
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=2562305';
    const apiId = '&appid=886e11ce358c57ac6df061c636678a92&units=' + units;
    const apiUrl = (baseUrl + apiId)

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            res.send({ data });
            // res.send(console.log({ data }));
        })
        .catch(err => {
            // res.redirect('/error');
            res.send(console.log(err))
            res.send(err)
        });
})

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log('Live on: ' + port)
})




