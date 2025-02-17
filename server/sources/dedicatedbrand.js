const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage eshop for dedicated
 * @param  {String} data - html response
 * @return {Object} eshop
 */

// I finally managed to scrap correctly the picture

const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const link = `https://www.dedicatedbrand.com${$(element)
      .find('.productList-link')
      .attr('href')}`;

      const brand = 'dedicated';

      const name = $(element)
      .find('.productList-title')
      .text()
      .trim()
      .replace(/\s/g, ' ');

      const price = parseInt($(element)
      .find('.productList-price')
      .text()
      );
          
      const photo = $(element)
      .find('img')
      .attr('data-src');
        
      const uuid = uuidv5(link, uuidv5.URL);

      return {brand, link, name, price, photo, uuid};
      
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
