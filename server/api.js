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

/**
 * Connection
 */

 async function connection(){
    await db.connect();
  }

/*********************************************
 * Request API 
 */


/**
 * Test
 * URL : http://localhost:8092/
 */

 app.get('/', (request, response) => {
  response.send({ 'ack': true });
});


/**
 * All products
 * URL : http://localhost:8092/products
 */

 app.get('/products', async(request, response) => {
  await connection();
  let products = await db.all_products();
  response.send({"all products" : products});
})


/**
 * By id
 * test_id : 624578c70893460e53714433
 * URL : http://localhost:8092/products/624578c70893460e53714433
 */

 app.get('/products/:_id', async (request, response) => {
  await connection();
  let product = await db.by_id(request.params._id);
  response.send({"product by id": product})
})

/**
 * Search
 */

 app.get('/products/search', async (request, response) => {
  // set default values for query parameters
  const { brand = 'all', price = 'all', limit = 12, skip = 0, sort = 1 } = request.query;
  if (brand === 'all' && price === 'all') {
      const products = await db.find_limit([{ '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(products);
  } else if (brand === 'all') {
      const products = await db.find_limit([{ '$match': { 'price': { '$lte': parseInt(price) } } }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(products);
  } else if (price === 'all') {
      const products = await db.find_limit([{
          '$match': { 'brand': brand }
      }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(products);
  } else {
      const products = await db.find_limit([{ '$match': { 'brand': brand } },
      { '$match': { 'price': { '$lte': parseInt(price) } } },
      { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
      response.send(products);
  }
})


/***************************************************
 * main
 */

async function main(){
    await connection();
    app.listen(PORT);
  }
  main();

