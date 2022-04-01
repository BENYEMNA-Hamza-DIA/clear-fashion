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
 * URL app : https://server-six-pink.vercel.app/products
 */

 app.get('/products', async(request, response) => {
  await connection();
  
  const filters = request.query;
  const count = await db.count_db();

  let products = await db.products_search({}, offset, limit);

  response.send({"products" : products, "meta" : meta});
})


/**
 * By id
 * test_id : 62473543421ed444877b9909
 * URL test: http://localhost:8092/products/62473543421ed444877b9909
 * URL app : https://server-six-pink.vercel.app/62473543421ed444877b9909
 */

 app.get('/products/:_id', async (request, response) => {
  await connection();
  var product = await db.by_id(request.params._id)
  
  response.send({"product by id": product});
})

/**
 * By brand
 */

app.get('/products/brand=', async(request, response) => {
  await connection();
  var products = await db.products_search({'brand': 'adresse'})

  response.send({"products" : products});
})

/**
 * By price limit
 */

 app.get('/products/price=', async(request, response) => {
  await connection();
  var products = await db.products_search({'price': 50})

  response.send({"products" : products});
})


/**
 * Search
 */

 app.get('/products/search', async(request, response) => {
   await connection();
  const filters = request.query;
  
  const brand = filters.brand !== undefined ? filters.brand : ''
  const price = parseInt(filters.price,10) > 0 ? parseInt(filters.price,10) : ''
  const limit = parseInt(filters.limit,10) > 0 ? parseInt(filters.limit,10) : 12

  var match = {}
  if( brand === '' &&  price !== '') match = {price: price} 
  else if(brand !== '' && price === '') match = {brand: brand}
  else if(brand !== '' && price !== '') match = {brand: brand, price: price}

  query = [{'$match' : match},{'$sort' : {price:1}},{'$limit' : limit}]
  
  var products = await db.find_limit(query)

  response.send(products);
})


/***************************************************
 * main
 */

async function main(){
    await connection();
    app.listen(PORT);
    await db.close();
  }

main();