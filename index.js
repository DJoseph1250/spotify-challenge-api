"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var Person = require("./models/people");
var mongoose = require("mongoose");
var restful = require('node-restful');
var appPort = (process.env.PORT || 8000);
var connectionString = process.env.MONGODB_URI;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("port", appPort);
var peopleApi = restful.model("person", Person.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/people");
mongoose.connect(connectionString);
// ===============
// SERVER
// ===============
var port = app.get("port");
var server = app.listen(port, function () {
    // note: Only for debugging purposes to see that your variables are set correctly...
    console.log("connectionString is: " + connectionString);
    console.log("port is: " + port);
    console.log("Server started listening...");
});
//# sourceMappingURL=index.js.map