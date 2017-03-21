import * as express from "express";  
import * as bodyParser from "body-parser";  
import * as Person from "./models/people";  
import * as mongoose from "mongoose";

var restful = require('node-restful'); 

let appPort: number =  (process.env.PORT || 8000);  
let connectionString: string = process.env.MONGODB_URI;  

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
let port:number = app.get("port");  
var server = app.listen(port, function(){

    // note: Only for debugging purposes to see that your variables are set correctly...
    console.log("connectionString is: " + connectionString);
    console.log("port is: " + port);
    console.log("Server started listening...");
});