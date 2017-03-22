"use strict";
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

var peopleSchema = new mongoose.Schema({
    name: String,
    favoriteCity: String
});

peopleSchema.plugin(autoIncrement.plugin, {
    model: 'Person',
    startAt: 1,
    incrementBy: 1
});
var Person = connection.model("Person", peopleSchema);
var person = new Person();


person.save(function (err) {

    // person._id === 100 -> true

    person.nextCount(function(err, count) {

        // count === 101 -> true

        person.resetCount(function(err, nextCount) {

            // nextCount === 100 -> true

        });

    });

});

module.exports = Person;
//# sourceMappingURL=people.js.map