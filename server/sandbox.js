/* eslint-disable no-console, no-process-exit */

/** Link of the brands :
 * https://www.dedicatedbrand.com/en/men/news
 * https://adresse.paris/602-nouveautes
 * https://www.montlimart.com/toute-la-collection.html
 */


//Dedicatedbrand

const dedicatedbrand = require('./sources/dedicatedbrand');

/** 
 * sandbox for dedicatedbrand
 * @param {*} eshop 
 */

/*async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('products_dedicatedbrand.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON file is created and saved.");
      });
      
    console.log(products);
    console.log('done');
    //process.exit(0); //if executed, it do not create our JSON file with the 
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
*/


//Adresse

const adresse = require('./sources/adresse');

/**
 * sandbox for adresse
 * @param {*} eshop 
 */

/*
 async function sandbox (eshop = 'https://adresse.paris/602-nouveautes') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresse.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('products_adresse.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON file is created and saved.");
      });
      
    console.log(products);
    console.log('done');
    //process.exit(0); //if executed, it do not create our JSON file with the 
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
*/


const [,, eshop] = process.argv;

sandbox(eshop);