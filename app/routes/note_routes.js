var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

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

    //get One by ID
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    // get All
    app.get('/notes', (req, res) => {
        const id = req.params.id;
        db.collection('notes').find({ 'title' }, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });


    // Add one
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};