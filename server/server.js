import config from "../config/config";
import app from './express';
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";

/* const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if(err){
        console.error(err)
    }
    //const collection = client.db("test").collection("devices");
    
    // perform actions on the collection object
    client.close();
}); */

/*
try {
    // Connect to the MongoDB cluster
    const con = new MongoClient(
        config.mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
    );

    client.connect(err => {
        if(err) {
            console.log(err)
        } else {
            console.log("mongoose conected")
        }
    })
} catch (e) {
    console.log("could not connect");
}
*/

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { 
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true 
});
const conn = mongoose.connection;

conn.on('error', () => {
    throw new Error("unable to connect to database: ${config.mongoUri}");
});

app.listen(config.port, function(err) {
    if(err) {
        console.log(err);
    }
    console.info('Server started on port %s', config.port);
});