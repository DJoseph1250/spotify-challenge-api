"use strict";
var mongoose = require("mongoose");
;
var peopleSchema = new mongoose.Schema({
	_id: String,
    name: String,
    favoriteCity: String
});
var Person = mongoose.model("Person", peopleSchema);
module.exports = Person;
//# sourceMappingURL=people.js.map