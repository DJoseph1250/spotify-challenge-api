"use strict";
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

var peopleSchema = new mongoose.Schema({
    name: String,
    favoriteCity: String
});

peopleSchema.plugin(autoIncrement.plugin, "Person");
var Person = connection.model("Person", peopleSchema);
module.exports = Person;
//# sourceMappingURL=people.js.map