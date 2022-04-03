const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');

const PORT = 8092;
const app = express();
module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


console.log(`📡 Running on port ${PORT}`);

// server :  https://hamza-server-seven.vercel.app


/**
 * Connection : use this function to be sure that the database is connected 
 * because I did'nt implement the connections in the methods
 */

 async function connection(){
    await db.connect();
  }

/*********************************************
 * Request API 
 */


/**
 * Test
 * 
 * URL test: http://localhost:8092/
 * 
 */

 app.get('/', (request, response) => {
  response.send({ 'ack': true });
});

/**************************************************************************************************
 * Endpoints
 */

/**
 * All products
 * API URL : https://hamza-server-seven.vercel.app/products
 */


 app.get('/products', async(request, response) => {
  
  await connection();

  var products = await db.products_search({});

  response.send({"products by search method" : products});
})

/**
 * unused method
 */

 /**
 app.get('/products', async(request, response) => {
  await connection();
  products = await db.all_products();
  
  response.send({"all product": products});
})
*/


/**
 * Search
 * API URL : https://hamza-server-seven.vercel.app/products/search?
 */


 app.get('/products/search', async (request, response) => {
  const { brand = 'all', price = 'all', limit = 12, skip = 0, sort = 1 } = request.query;
  if (brand === 'all' && price === 'all') {
    var searched_products = await db.find_limit([{ '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(searched_products);
  } else if (brand === 'all') {
    var searched_products = await db.find_limit([{ '$match': { 'price': { '$lte': parseInt(price) } } }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(searched_products);
  } else if (price === 'all') {
    var searched_products = await db.find_limit([{
          '$match': { 'brand': brand }
      }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(searched_products);
  } else {
    var searched_products = await db.find_limit([{ '$match': { 'brand': brand } },
      { '$match': { 'price': { '$lte': parseInt(price) } } },
      { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(searched_products);
  }
});


/** 
 * By id
 * test_id : 62480a7504e74ad3c330f5dc
 * API URL : https://hamza-server-seven.vercel.app/products/62480a7504e74ad3c330f5dc
*/

const { ObjectId } = require('mongodb');

app.get('/products/:_id',  async(request, response) => {

  var product = await db.by_id(request.params._id)
  
  response.send({"product by id : " : product});
})


/***************************************************
 * Listen PORT
 */

app.listen(PORT);




