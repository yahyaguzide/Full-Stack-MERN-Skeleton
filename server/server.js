import config from "../config/config";
import app from './express';
import mongoose from 'mongoose';

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

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        config.mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );
} catch (e) {
    console.log("could not connect");
}

/* mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { 
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true 
});
const conn = mongoose.connection;

conn.on('error', () => {
    throw new Error("unable to connect to database: ${config.mongoUri}");
}); */

app.listen(config.port, (err) => {
    if(err) {
        console.log(err);
    }
    console.info('Server started on port %s', config.port);
});