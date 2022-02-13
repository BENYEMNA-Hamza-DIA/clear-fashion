/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://www.dedicatedbrand.com/en/men/news
 */


const dedicatedbrand = require('./sites/dedicatedbrand');

/** 
 * sandbox for dedicatedbrand
 * @param {*} eshop 
 */


async function sandbox_dedicatedbrand (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    let total = 0

    const total_products = []
    
    for (var i = 1; ; i++){
      let eshop = 'https://www.dedicatedbrand.com/en/men/news?p=' + i;
      console.log(`🕵️‍♀️  browsing ${eshop} source`);

      let products = await dedicatedbrand.scrape(eshop);
      if (products.length!=0){
        console.log(products);
        products.forEach(product => total_products.push(product));
        console.log(products.length,'products was scrapped');
        total += products.length
      }
      else{
        console.log(total,'total products scrapped')
        console.log(total_products.length,'lenght of total_products')
        if (total == total_products.length){
          console.log('Scrapping was sucessfully done')
        }
        
        process.exit(0);
      }
      
      const fs = require('fs');

      const data = JSON.stringify(total_products);

      fs.writeFile('products_dedicatedbrand.json', data, (err) => {
        if (err) {              
          throw err;
        }
        console.log("JSON file 'products_dedicatedbrand.json' is created and saved.");
      });
      
    }
      
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox_dedicatedbrand(eshop);