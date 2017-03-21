import * as mongoose from "mongoose";

interface IPerson{  
    name:string;
    favoriteCity:string;    
}

interface IPersonModel extends IPerson, mongoose.Document{};

var peopleSchema = new mongoose.Schema({  
    name: String,
    favoriteCity: String
});

var Person = mongoose.model<IPersonModel>("Person", peopleSchema);  
export = Person;