/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://www.dedicatedbrand.com
 */


const dedicatedbrand = require('./sites/dedicatedbrand');

/** 
 * sandbox for dedicatedbrand
 * @param {*} eshop 
 */


async function sandbox_dedicatedbrand (eshop = 'https://www.dedicatedbrand.com/en/men/all-men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    let total_products_scrapped_db = 0
    let total_pages_scrapped_db = 0

    const total_products_db = []
    
    for (var i = 1; ; i++){
      total_pages_scrapped_db += 1
      let eshop = 'https://www.dedicatedbrand.com/en/men/all-men?p=' + i;
      console.log(`🕵️‍♀️  browsing ${eshop} source`);

      let products = await dedicatedbrand.scrape(eshop);
      if (products.length!=0){
        console.log(products);
        products.forEach(product => total_products_db.push(product));
        console.log(products.length,'products was scrapped from page',total_pages_scrapped_db);
        total_products_scrapped_db += products.length
        
      }
      else{
        console.log(total_products_scrapped_db,'total products scrapped from',total_pages_scrapped_db,'pages')
        
        //console.log(total_products.length,'lenght of total_products')
        
        if (total_products_scrapped_db == total_products_db.length){
          console.log('Scrapping was sucessfully done')
          console.log("JSON file 'products_dedicatedbrand.json' is created and saved.");
        }
        
        process.exit(0);
      }
      
      const fs = require('fs');

      const data = JSON.stringify(total_products_db);

      fs.writeFile('products_dedicatedbrand.json', data, (err) => {
        if (err) {              
          throw err;
        }
        
      });
      
      
    }
      
  } catch (e) {
    console.error(e);
    
    process.exit(1);
    
  }
}

const [,, eshop] = process.argv;

sandbox_dedicatedbrand(eshop);