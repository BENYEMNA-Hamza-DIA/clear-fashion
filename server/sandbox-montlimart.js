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
    const total_products_ml = [] 

    let products = await montlimart.scrape(eshop);
    console.log(products);
    products.forEach(product => total_products_ml.push(product));

    console.log(total_products_ml.length,'total products scrapped')
    
    console.log('Scrapping was sucessfully done');
    

    const fs = require('fs');

    const data = JSON.stringify(total_products_ml);

    fs.writeFileSync('products_montlimart.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON file 'products_montlimart.json' is created and saved.");
    });

    process.exit(0); //if executed, it do not create our JSON file with the 

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, eshop] = process.argv;

sandbox_montlimart(eshop);