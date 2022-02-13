/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://www.dedicatedbrand.com/en/men/news
 */


const dedicatedbrand = require('./sites/dedicatedbrand');
const db = require('./db');

/** 
 * sandbox for dedicatedbrand
 * @param {*} eshop 
 */


async function sandbox_dedicatedbrand (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    let i = 0;
    do {
      var test = true;
      const products = await dedicatedbrand.scrape(eshop + '?p=' + i);
      console.log(products);
      i++;
      if (products.lenght < 2) //if 0, inifinite loop
      {
        test = false;
      }
    } while (test);
    /*
    const fs = require('fs');

    const data = JSON.stringify(products);

    fs.writeFile('products_dedicatedbrand.json', data, (err) => {
        if (err) {              
          throw err;
        }
        console.log("JSON file 'products_dedicatedbrand.json' is created and saved.");
      });
      */
    console.log(products);
    console.log('Scrapping was sucessfully done');
    console.log(products.length,'products found')
    process.exit(0); //if executed, it do not create our JSON file with the list of products 
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



//Montlimart

const montlimart = require('./sources/montlimart');


/**
 * sandbox for montlimart
 * @param {*} eshop 
 */

/*
 async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('products_montlimart.json', data, (err) => {
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

sandbox_dedicatedbrand(eshop);