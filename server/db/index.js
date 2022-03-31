require('dotenv').config();
const {MongoClient} = require('mongodb');
const {ExplainVerbosity} = require('mongodb');

const MONGODB_URI = 'mongodb+srv://hamza-ben:uKCd4vwXye2SCuzS@clearfashion.so4t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashion';

let client;
let db;

const products = require('../total_products.json'); //products of the crapping to store in the mongodb database

const { ObjectId } = require('mongodb');

/**
 * Connection to the db 
 * @param {*} MONGODB_URI 
 * @param {*} MONGODB_DB_NAME 
 */



const connect = async (uri = MONGODB_URI, name = MONGODB_DB_NAME) => { 
    console.log("⏳ Connection to ClearFashion cluster ...");
    try {

        client = await MongoClient.connect(uri, {'useNewUrlParser': true});
        console.log("🎯 Connection Successful !");
        db =  client.db(name);
    }
    catch (error) {
        console.log('Connection failed.', error);
    }
}

module.exports.connect = connect;



/**
 * Close the connection to the db
 */
 const close = async () => {
  await client.close();
  console.log("Connection closed.");
}

module.exports.close = close;


/**
* Create a database in the cluster
*/
async function create_database(){
  //const db = await connect();
  //if the database exists, it drops it. This way, we could refresh the database.
  //if(db.collection('all_products')){
    //await db.collection('all_products').drop();
  //}
  const data = db.collection('products');
  const result = await data.insertMany(products, {'ordered': false});
  console.log("👕 Products successfully loaded in ClearFashion ");

}


/**
 * Drop the database
 */
async function drop_database(){
  await db.collection("products").drop();
  console.log('Database refresh ...')
}
  

/***********************************************************
 * Methods for query
 */


/**
 * Aggregate
 * @param {given query} query 
 * @returns 
 */

 module.exports.find_limit = async (query) => {
 //find_limit = async (query) => {
  //const db = await connect();
  const data = db.collection("products");
  const result = await data.aggregate(query).toArray();
  //console.log(result);
  return (result);
};


/** 
* All products
*/

module.exports.all_products = async () => {
//all_products = async () => {
  //const db = await connect();
  const data = await db.collection("products");
  const all_products = await data.find().toArray();
  console.log(all_products);
  return (all_products);
}


/**
 * 
 * @param {given id} product_id 
 * @returns 
 */

//module.exports.find_by_id= async (product_id) => {
find_by_id = async (product_id) => {
    //const db = await connect();
    const data = db.collection('products');
    const product = await data.find({'_id': ObjectId(product_id)}).toArray();
    console.log("Products with the id '" + product_id + "' :");
    console.log(product);
    return (product);
}

/**
 * Find all the products using a brand
 * @param {given brand} brand 
 * @returns 
 */

module.exports.by_brand = async (brand) => {
//by_brand = async (brand) => {
  //const db = await connect();
  const data = db.collection('products');
  const brand_filtered = await data.find({'brand' : `${brand}`}).toArray();
  //console.log("Products from the brand " + brand + ":");
  //console.log(brand_filtered);
  return (brand_filtered);
}

/**
 * All the products that cost less than a given price
 * @param {given price} price 
 * @returns 
 */

module.exports.less_than_price = async (price) => {
//less_than_price = async (price) => {
  //const db = await connect();
  const data = db.collection('products');
  const price_limited = await data.find({'price' : {'$lte' : parseInt(price,10)}}).toArray();
  //console.log("Products that cost less than " + price + ":");
  //console.log(price_limited);
  return (price_limited);
 }


/**
 * Return all the products sorted by price asc
 */

module.exports.sorted_price_asc = async () => {
//sorted_price_asc = async () => {
  //const db = await connect();
  const data = db.collection('products')
  const sorted_asc = await data.find().sort({'price' : 1}).toArray();
  //console.log('Products sorted by ascending price:');
  //console.log(sorted_asc);
  return (sorted_asc);
}


/**
 * Return all the products sorted by price desc
 */

module.exports.sorted_price_desc = async () => {
 //sorted_price_desc = async () => {
  //const db = await connect();
  const data = db.collection('products')
  const sorted_desc = await data.find().sort({'price' : -1}).toArray();
  //console.log('Products sorted by descending price:');
  //console.log(sorted_desc);
  return (sorted_desc);
}


/***************************************************************
* Main function
*/

async function main(){

  await connect();

  //To refresh the database, we drop then create. BAD IDEA !
  //Delete database
  //await drop_database();
  
  //Create database
  //await create_database();

  /**
   *  Queries
   */
  //await all_products();
  await find_by_id("624575ff6e2f73db99c69000");
  //await by_brand('adresse');
  //await less_than_price(50);
  //await sorted_price_asc();
  //await sorted_price_desc();

  await close();
};

main();

