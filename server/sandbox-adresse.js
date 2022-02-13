/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://adresse.paris/630-toute-la-collection
 */

//Adresse

const adresse = require('./sources/adresse');

/**
 * sandbox for adresse
 * @param {*} eshop 
 */


 async function sandbox_adresse (eshop = 'https://adresse.paris/630-toute-la-collection') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresse.scrape(eshop);

    const fs = require('fs');

      const data = JSON.stringify(products);

      fs.writeFile('products_adresse.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON file 'products_adresse.json' is created and saved.");
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

sandbox_adresse(eshop);
