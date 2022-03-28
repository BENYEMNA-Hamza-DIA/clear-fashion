// tuto : https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i
// JavaScript source code
const MongoClient = require('mongodb').MongoClient;
//const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://hamza-ben:uKCd4vwXye2SCuzS@clearfashion.so4t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const MONGODB_DB_NAME = 'ClearFashion'

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let connexion_db=client.db(MONGODB_DB_NAME)
        console.log('Successfully connected to database !')
        return connexion_db
    }
    catch (err) {
        console.error(`Error connecting to the database... \n${err}`);
    }

}

connect();

/**
 * Creating a collection with all the products
 */

const all_products = require('../total_products.json');

async function create_collection(products) {
    const db = await connect();
    const collection = db.collection('all_products');
    for (product of products) {
        const result = collection.insertMany(product);
    }
}

create_collection([all_products]);