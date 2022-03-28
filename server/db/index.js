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
  



/**
* Main function
*/
async function main(){
  await connect();
  
  //Create database
  //await create_database();

  //Delete database
  //await drop_database();

  await close();
};

main();