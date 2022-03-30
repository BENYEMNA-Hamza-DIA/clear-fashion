const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
//const db = require('./db');

const PORT = 8092;
const app = express();
module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());



app.get('/', (request, response) => {
  response.send({'ack': true});
});


/**
 * Api requests
 */

/**
 * All products
 */

/** 
app.get('/products', async(request, response) => {

  let products = await db.all_products();

  response.send({ "product": products })
})
*/


async function main(){
  //await db.connect();
  
  console.log(`📡 Running on port ${PORT}`);
  app.listen(PORT);
  

  //await db.close();
};
//main();
