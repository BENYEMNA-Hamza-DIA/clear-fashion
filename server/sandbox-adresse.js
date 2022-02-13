/* eslint-disable no-console, no-process-exit */

/** Link of the brands :
 * https://www.dedicatedbrand.com/en/men/news
 * https://adresse.paris/602-nouveautes
 * https://www.montlimart.com/toute-la-collection.html
 */

//Adresse

const adresse = require('./sources/adresse');

/**
 * sandbox for adresse
 * @param {*} eshop 
 */


 async function sandbox_adresse (eshop = 'https://adresse.paris/602-nouveautes') {
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
