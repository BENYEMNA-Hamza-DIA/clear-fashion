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
 * Limit and paginate
 */

 //const { nb_limit, paginate } = require('paginate-info');


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
 * test_id : 62473543421ed444877b9909
 * URL test: http://localhost:8092/products/62473543421ed444877b9909
 * URL app : https://server-six-pink.vercel.app/62473543421ed444877b9909
 */

 app.get('/products/:_id', async (request, response) => {
  await connection();
  let product = await db.by_id(request.params._id);
  response.send({"product by id": product})
})

/**
 * By brand
 */

 app.get('/products/brand=', async(request, response) => {
  await connection();
  let products = await db.by_brand(request.params.brand);
  response.send({"products" : products});
})


/**
 * Search
 */

 app.get('/products/search', async (request, response) => {
  // set default values for query parameters
  await connection();
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
});


/***************************************************
 * main
 */

async function main(){
    await connection();
    app.listen(PORT);
    //await db.close();
  }

main();

