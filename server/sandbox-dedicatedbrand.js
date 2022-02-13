/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://www.dedicatedbrand.com/en/men/news
 */


import { scrape } from './sites/dedicatedbrand';
import db from './db';

/** 
 * sandbox for dedicatedbrand
 * @param {*} eshop 
 */


async function sandbox_dedicatedbrand (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    //const total_products = []
    
    for (var i = 1; ; i++){
      let eshop = 'https://www.dedicatedbrand.com/en/men/news?p=' + i;
      console.log(`🕵️‍♀️  browsing ${eshop} source`);

      let products = await scrape(eshop);
      if (products.length!=0){
        console.log(products);
        products.forEach(product => total_products.push(product));
        console.log(products.length,'products was scrapped');
        
      }
      else{
        console.log('Scrapping was sucessfully done')
        process.exit(0);
      }
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
    }
    
      
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



//Montlimart

import montlimart from './sources/montlimart';


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