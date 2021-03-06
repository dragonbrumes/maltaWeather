const fetch = require('node-fetch');
const path = require('path');
var cors = require('cors');

var ObjectID = require('mongodb').ObjectID;
const myCollection = 'articles';

module.exports = function(app, db) {
  // // on the request to root (localhost:3000/)
  // app.get('/', (req, res) => {
  //     res.send('<b>You are in the front page</b>')
  // })

  // // serve React page
  // app.get('/app', (req, res) => {
  //     res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
  // });

  // //fetch weather
  // app.get('/api/weather', cors(), (req, res, next) => {
  //     const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?id=2562305';
  //     const apiId = '&appid=87c58a605846f73484361aef29c5c4fb&units=metric';
  //     const apiUrl = (baseUrl + apiId)

  //     fetch(apiUrl)
  //         .then(res => res.json())
  //         .then(data => {
  //             res.send({ data });
  //             // res.send(console.log({ data }));
  //         })
  //         .catch(err => {
  //             // res.redirect('/error');
  //             res.send(console.log(err))
  //             res.send(err)
  //         });
  // })

  //get one article by ID sended by the front
  app.get('/api/article/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection(myCollection).findOne(details, (err, item) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
        console.log(err);
      } else {
        // console.log('--------------');
        // console.log(item);
        // console.log('--------------');
        res.status(200).send(item);
      }
    });
  });

  // get All
  app.get('/api/articles', (req, res) => {
    const id = req.params.id;
    db.collection(myCollection)
      .find({})
      .toArray((err, item) => {
        if (err) {
          res.status(500).send({ error: 'An error has occurred' });
          console.log(err);
        } else {
          res.status(200).send(item);
        }
      });
  });

  // Add one
  app.post('/api/article', (req, res) => {
    const note = { content: req.body.content, title: req.body.title };
    db.collection(myCollection).insertOne(note, (err, result) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
        console.log(err);
      } else {
        res.status(200).send(result.ops[0]);
      }
    });
  });

  /*************** TESTS ************/
  // // GETS A SINGLE USER FROM THE DATABASE
  // app.get('/notes2/:id', function (req, res) {
  //     db.collection('notes').findById(req.params.id, function (err, user) {
  //         if (err) return res.status(500).send("There was a problem finding the user.");
  //         if (!user) return res.status(404).send("No user found.");
  //         res.status(200).send(user);
  //     });
  // });

  // // RETURNS ALL THE USERS IN THE DATABASE
  // app.get('/notes', function (req, res) {
  //     db.collection('notes').find({}, function (err, item) {
  //         if (err) return res.status(500).send("There was a problem finding the users.");
  //         res.status(200).send(item);
  //     });
  // });
  /***************** fin tests */
}; // end export
