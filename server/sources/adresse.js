const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');


/**
 * Parse webpage e-shop for adresse
 * @param  {String} data - html response
 * @return {Array} products
 */

// I finally managed to scrap correctly the picture

 const parse = (data) => {
    const $ = cheerio.load(data);
    return $('.product-container')
    .map((i, element)=> {
        const link = `${$(element).find('a').attr('href')}`;
        
        const brand = "adresse";

        const name = $(element)
        .find('.product-name-container.versionpc .product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');

        const price = parseInt($(element)
        .find('.price.product-price')
        .text()
        );

        const photo = $(element)
        .find('a img.replace-2x.lazy.img_0')
        .attr('data-original');

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