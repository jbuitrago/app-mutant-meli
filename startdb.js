var http = require('http');  
const mongoose = require('mongoose');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_CONNECTION;  

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    console.log("connect to " +  uri )  
  const mutant_dnas = client.db("mutantdb").collection("mutant_dnas");
  mutant_dnas.remove();
  console.log("remove mutant_dnas...")
  const human_dnas = client.db("mutantdb").collection("human_dnas");
  human_dnas.remove();
  console.log("remove human_dnas...")
  client.close();
});