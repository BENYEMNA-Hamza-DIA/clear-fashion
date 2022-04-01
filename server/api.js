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

// server : https://server-sigma-ashen.vercel.app

/**
 * All products
 * URL : http://localhost:8092/products
 * URL app : https://server-sigma-ashen.vercel.app/products
 */


 app.get('/products', async(request, response) => {

  const products = await db.products_search()

  response.send({"products" : products});
})


 /** 
 app.get('/products', async(request, response) => {
  await connection();
  
  const product = await db.all_products()
  
  response.send({"product": product});
})
*/

/**
 * By id
 * test_id : 62473543421ed444877b9909
 * URL test: http://localhost:8092/products/62473543421ed444877b9909
 * URL app : https://server-sigma-ashen.vercel.app/products/62473543421ed444877b9909
 */

 app.get('/products/:_id', async (request, response) => {

  var product = await db.by_id(request.params._id)
  
  response.send({"product by id": product});
})


/**
 * Search
 * 
 * URL app : https://server-six-pink.vercel.app/products/search?brand=montlimart
 * 
 */

/**
 app.get('/products/search', async(request, response) => {

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
 * Listen PORT
 */
app.listen(PORT);
