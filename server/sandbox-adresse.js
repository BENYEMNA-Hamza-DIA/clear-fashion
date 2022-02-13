/* eslint-disable no-console, no-process-exit */

/** Link of the brand :
 * https://adresse.paris/630-toute-la-collection
 */

//Adresse

const adresse = require('./sites/adresse');

/**
 * sandbox for adresse
 * @param {*} eshop 
 */


 async function sandbox_adresse (eshop = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118') {
  try {
    
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const total_products_a = [] 

    let products = await adresse.scrape(eshop);
    console.log(products);
    products.forEach(product => total_products_a.push(product));

    console.log(total_products_a.length,'total products scrapped')
    
    console.log('Scrapping was sucessfully done');
    

    const fs = require('fs');

    const data = JSON.stringify(total_products_a);

    fs.writeFile('products_adresse.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON file 'products_adresse.json' is created and saved.");
    });

    //process.exit(0); //if executed, it do not create our JSON file with the 

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox_adresse(eshop);
