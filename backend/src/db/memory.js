const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not set. Check your .env file and dotenv path.');
}

let client, db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function connectToMongo() {
    if(!db){
        const uri = process.env.MONGO_URI;
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        await client.connect();
        db = client.db("PMG-Chess");
        await db.collection("users").createIndex({email: 1}, {unique: true});
        console.log("Connected to MongoDB");
    }
    return db;
}

function getDb() {
    if (!db) throw new Error("Database not connected.");
    return db;
}

module.exports = { connectToMongo, getDb };