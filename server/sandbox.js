/* eslint-disable no-console, no-process-exit */

/** Link of the brands :
 * https://www.dedicatedbrand.com/en/men/news
 * https://adresse.paris/602-nouveautes
 * https://www.montlimart.com/toute-la-collection.html
 */


const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse = require('./sources/adresse')
const montlimart = require('./sources/montlimart')

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('product_dedicatedbrand.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON file is created and saved.");
      });
      
    console.log(products);
    console.log('done');
    //process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

/**
 * Code to scrape the data from the website:
 * 
 * Brand 1:
 * node sandbox.js "https://www.dedicatedbrand.com/en/men/t-shirts"
 * 
 * 
 */