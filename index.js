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
app.set("port", appPort);
var peopleApi = restful.model("person", Person.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/people");
mongoose.connect(connectionString);
// Server stuff
var port = app.get("port");
var server = app.listen(port, function () {
    console.log("connectionString is: " + connectionString);
    console.log("Server listening on port: " + port);
});
//# sourceMappingURL=index.js.map