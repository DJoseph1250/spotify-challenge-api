"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var Person = require("./models/people");
var mongoose = require("mongoose");
var restful = require('node-restful');
var appPort = (process.env.PORT || 8000);
var connectionString = process.env.MONGODB_URI;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};

var app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var PEOPLE_COLLECTION = 'people';


var db;
mongodb.MongoClient.connect(connectionString, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");


    // Start server
    var server = app.listen(appPort, function () {  
        var port = server.address().port;
        console.log("App is running on port", port); 
    });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: ", reason);
    res.status(code || 500).json({"error" : message});
}

// Retrieve all
app.get('/api/people', function (req, res) {
    db.collection(PEOPLE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get people.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/people', function (req, res) {
    var newPerson = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(PEOPLE_COLLECTION).insertOne(newPerson, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new person.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.put('/api/people', function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(PEOPLE_COLLECTION).updateMany(updateDoc, function (err, doc) { 
        if (err) {
            handleError(res, err.message, "Failed to update people.");
        } else {
            res.status(200).json(doc.ops[0]);
        }
     });
});

// Retrieve by ID
app.get('/api/people/:id', function (req, res) {
    db.collection(PEOPLE_COLLECTION).findOne({_id: req.params.id}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get person");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.delete('/api/people/:id', function (req, res) {
    db.collection(PEOPLE_COLLECTION).deleteOne({_id: req.params.id}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete person");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

app.put('/api/people/:id', function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(PEOPLE_COLLECTION).updateOne({_id: req.params.id}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update person");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});


// app.set("port", appPort);
// var peopleApi = restful.model("person", Person.schema)
//     .methods(["get", "post", "put", "delete"])
//     .register(app, "/api/people");
// mongoose.connect(connectionString);
// // Server stuff
// var port = app.get("port");
// var server = app.listen(port, function () {
//     console.log("connectionString is: " + connectionString);
//     console.log("Server listening on port: " + port);
// });
//# sourceMappingURL=index.js.map