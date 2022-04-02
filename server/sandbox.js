/* eslint-disable no-console, no-process-exit */

/**
 * Note : this sandbox merge all the 3 for different brand that 
 * I have made for each brand and export it to a json file that 
 * is used to create a database in Mongo Atlas 
 */
/** Link of the brands :
 * 
 * https://adresse.paris/630-toute-la-collection
 * https://www.dedicatedbrand.com
 * https://www.montlimart.com/toute-la-collection.html?limit=all
 * 
 */

const fetch = require("node-fetch");
const fs = require('fs');

/** 
 * Sources:
 */

const source_adresse = require('./sources/adresse');
const source_dedicatedbrand = require('./sources/dedicatedbrand');
const source_montlimart = require('./sources/montlimart');

async function sandbox () {
  try {
    /**
     * Scrapping for adresse
     */

    const eshop_adresse = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
    
    console.log(`🕵️‍♀️  browsing ${eshop_adresse} source`);
    
    const total_products_adresse = [] 

    let products_adresse = await source_adresse.scrape(eshop_adresse);
    console.log(products_adresse);
    products_adresse.forEach(product => total_products_adresse.push(product));

    console.log('Scrapping was sucessfully done for adresse');
    console.log(products_adresse);

    
    /**
     * Scrapping dor dedicatedbrand
     */

     const eshop_dedicatedbrand = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
     console.log(`🕵️‍♀️  browsing ${eshop_dedicatedbrand} source`);
    
     let total_products_scrapped_db = 0
     let total_pages_scrapped_db = 0
 
     const total_products_db = []
     
     for (var i = 1; ; i++){
       total_pages_scrapped_db += 1
       let eshop_dedicatedbrand = 'https://www.dedicatedbrand.com/en/men/all-men?p=' + i;
       console.log(`🕵️‍♀️  browsing ${eshop_dedicatedbrand} source`);
 
       let products_dedicatedbrand = await source_dedicatedbrand.scrape(eshop_dedicatedbrand);
       if (products_dedicatedbrand.length==0){
         
         if (total_products_scrapped_db == total_products_db.length){
          console.log('Scrapping was sucessfully done for dedicatedbrand');
         }
         else
         {
           console.log('Scrapping error')
         }
         break;
       }
       else{
        console.log(products_dedicatedbrand);
        products_dedicatedbrand.forEach(product => total_products_db.push(product));
        console.log(products_dedicatedbrand.length,'products was scrapped from page',total_pages_scrapped_db);
        total_products_scrapped_db += products_dedicatedbrand.length
        }
      }

    /**
     * Scrapping for montlimart
     */
     const eshop_montlimart = 'https://www.montlimart.com/toute-la-collection.html?limit=all'
     console.log(`🕵️‍♀️  browsing ${eshop_montlimart} source`);
     
     const total_products_ml = [] 
 
     let products_montlimart = await source_montlimart.scrape(eshop_montlimart);
     console.log(products_montlimart);

     products_montlimart.forEach(product => total_products_ml.push(product));
     
     console.log('Scrapping was sucessfully done for montlimart');

    /**
     * Storage of all products
     */

    const total_products = []
    total_products_adresse.forEach(product => total_products.push(product));
    total_products_db.forEach(product => total_products.push(product));
    total_products_ml.forEach(product => total_products.push(product));
    
    console.log(total_products_adresse.length,'total products scrapped for adresse')
    console.log(total_products_scrapped_db,'total products scrapped from',total_pages_scrapped_db,'pages');
    console.log(total_products_ml.length,'total products scrapped for montlimart')

    console.log(total_products.length,'total products scrapped')
    console.log('Scrapping was sucessfully done');
    
    
    /**
     * Write a json file with all the products
     */

     const data = JSON.stringify(total_products);

     fs.writeFileSync('total_products.json', data, (err) => {
         if (err) {
             throw err;
         }
         
     });
    console.log("JSON file 'total_products.json' is created and saved.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
