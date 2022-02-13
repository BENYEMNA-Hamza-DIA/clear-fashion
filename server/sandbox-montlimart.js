/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://www.montlimart.com/toute-la-collection.html
 */

//Montlimart

const montlimart = require('./sites/montlimart');


/**
 * sandbox for montlimart
 * @param {*} eshop 
 */


 async function sandbox_montlimart (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('products_montlimart.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON file 'products_montlimart.json' is created and saved.");
      });
      
    console.log(products);
    console.log('Scrapping was sucessfully done');
    //process.exit(0); //if executed, it do not create our JSON file with the 
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, eshop] = process.argv;

sandbox_montlimart(eshop);