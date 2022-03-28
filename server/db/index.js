require('dotenv').config();
const {MongoClient, ExplainVerbosity} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://hamza-ben:uKCd4vwXye2SCuzS@clearfashion.so4t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashion';

let client;
let db;

const products = require('../total_products.json');


/**
 * Connection to the db 
 * @param {*} MONGODB_URI 
 * @param {*} MONGODB_DB_NAME 
 */
const connect = async (uri = MONGODB_URI, name = MONGODB_DB_NAME) => { 
    console.log("⏳ Connection to ClearFashion cluster ...");
    try {

        client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
        console.log("🎯 Connection Successful !");
        db =  client.db(MONGODB_DB_NAME);
    }
    catch (error) {
        console.log('Connection failed.', error);
    }
}


/**
 * Close the connection to the db
 */
 const close = async () => {
  await client.close();
  console.log("Connection closed.");
}


/**
* Create a database in the cluster
*/
async function create_database(){

  const collection = db.collection('all_products');
  const result = await collection.insertMany(products, {'ordered': false});
  console.log("👕 Products successfully loaded in ClearFashion ");

}


/**
 * Drop the database
 */
async function drop_database(){
  await db.collection('all_products').drop();
  console.log('Database dropped.')
}
  

/***********************************************************
 * Methods for query
 */

/**
 * Find all the products using a brand
 * 
 */

async function by_brand(brand){
  const collection = db.collection('all_products');
  const brand_filtered = await collection.find({'brand' : `${brand}`}).toArray();
  console.log("Products from the brand " + brand + ":");
  console.log(brand_filtered);}

/**
 * All the products that cost less than a given price
 * 
 */
async function less_than_price(price){
  const collection = db.collection('all_products');
  const price_limited = await collection.find({'price' : {'$lte' : parseInt(price,10)}}).toArray();
  console.log("Products that cost less than " + price + ":");
  console.log(price_limited );
 }

/**
 * Return all the products sorted by price asc
 */
 async function sorted_price_asc(){
  const collection = db.collection('all_products')
  const sorted_asc = await collection.find().sort({'price' : 1}).toArray();
  console.log('Products sorted by ascending price:');
  console.log(sorted_asc);
}


/**
 * Return all the products sorted by price desc
 */
 async function sorted_price_desc(){
  const collection = db.collection('all_products')
  const sorted_desc = await collection.find().sort({'price' : -1}).toArray();
  console.log('Products sorted by descending price:');
  console.log(sorted_desc);
}


/***************************************************************
* Main function
*/
async function main(){
  await connect();
  
  //Create database
  //await create_database();

  //Delete database
  //await drop_database();

  /**
   *  Queries
   */
  //await by_brand('dedicated');
  //await less_than_price(50);
  //await sorted_price_asc();
  await sorted_price_desc();

  await close();
};

main();