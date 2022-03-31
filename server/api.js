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
 */

 app.get('/', (request, response) => {
  response.send({ 'ack': true });
});


/**
 * All products
 */

 app.get('/products', async(request, response) => {
  await connection();
  let products = await db.all_products();

  response.send({"result" : products});
})


/***************************************************
 * main
 */

async function main(){
    await connection();
    app.listen(PORT);
  }
  main();

