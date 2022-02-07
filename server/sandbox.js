/* eslint-disable no-console, no-process-exit */

/** Link of the brands :
 * https://www.dedicatedbrand.com/en/men/news
 * https://adresse.paris/602-nouveautes
 * https://www.montlimart.com/toute-la-collection.html
 */


const dedicatedbrand = require('./sources/dedicatedbrand');


async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);
      
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

