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

 const { nb_limit, paginate } = require('paginate-info');


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

app.get('/products/search', async(request, response) => {
  const filters = request.query;
  console.log('filters :>> ', filters);
  
  const brand = filters.brand !== undefined ? filters.brand : ''
  const price = parseInt(filters.price,10) > 0 ? parseInt(filters.price,10) : ''
  const limit = parseInt(filters.limit,10) > 0 ? parseInt(filters.limit,10) : 12

  var match = {}
  if( brand === '' &&  price !== '') match = {price: price} 
  else if(brand !== '' && price === '') match = {brand: brand}
  else if(brand !== '' && price !== '') match = {brand: brand, price: price}

  query = [
    {'$match' : match},
    {'$sort' : {price:1}},
    {'$limit' : limit}
    ]
  console.log('query :>> ', query);
  
  var filteredProducts = await db.find_limit(query);

  console.log('filteredProducts.length :>> ', filteredProducts.length);
  response.send(filteredProducts);
})


/***************************************************
 * main
 */

async function main(){
    await connection();
    app.listen(PORT);
  }

  main();

