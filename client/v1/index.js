// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);

/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheapestTshirt='https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt';
console.log("The cheapest t-shirt : " + cheapestTshirt)




/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const lengthMarketPlace=marketplace.length;
console.log("Number of products : " + lengthMarketPlace)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

const brandsName = []
marketplace.forEach(product => brandsName.push(product.brandsName));
console.log("Brands name : " + brandsName.length);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function comparePrice(a,b)
{
  return parseFloat(a.price) - parseFloat(b.price);
}

let sortByPrice = marketplace;

sortByPrice.sort(comparePrice);
console.log("Sort by price : " + sortByPrice);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function compareDate(a,b)
{
  return new Date(a.date) - new Date(b.date);
}

let sortByDate = marketplace;

sortByDate.sort(compareDate);
console.log("Sort by date : " + sortByDate);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const products_range = marketplace.filter(({price}) => price => 50 && price <= 100);
console.log("Filter a specific price range : " + products_range);


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

var sum = 0;
var avgBasket = sum / marketplace.length;

marketplace.forEach(product => sum += product.price);
console.log("Average basket price in the marketplace : " + Math.round(avgBasket));



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//const adresseList = [];
const adresseList = [];
const loomList = [];
const milleList = [];
const dedicatedList = [];
const aatiseList = [];

marketplace.forEach(product => {
    if (product.brand == 'adresse') adresseList.push(product);
    else if (product.brand == 'loom') loomList.push(product);
    else if (product.brand == '1083') milleList.push(product);
    else if (product.brand == 'dedicated') dedicatedList.push(product);
    else aatiseList.push(product);
});

const brands = {
    'adresse': adresseList,
    'loom': loomList,
    '1083': milleList,
    'dedicated': dedicatedList,
    'aatise': aatiseList,
};
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable

console.log("Brands : " + brands);

// 3. Log the number of products by brands

console.log("Number of products by brand :" + 
  "\nAdresse : " + adresseList.length +
  "\nLoom : " + loomList.length + 
  "\n1083 : " + milleList.length + 
  "\nDedicated : " + dedicatedList.length + "\nAatise : " + aatiseList.length);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

console.log("Products sorted by price (highest to lowest)\n");
for (const i in brands) {
    let sortBrandByPrice = sortByPrice(brands[i]).reverse();
    console.table(sortBrandByPrice);
};


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

console.log("Products sorted by date (old to recent)\n");
for (const i in brands) {
    let sortBrandByDate = sortByDate(brands[i]).reverse();
    console.table(sortBrandByDate);
};


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


function calcP90(list) {
  let sortBrandByPrice = sortByPrice(list).reverse();
  const p90 = Math.round(0.90 * list.length);
  let j = 0;
  while (j != p90) {
      j += 1;
  }
  return (sortBrandByPrice[j]);
}
let p90Adresse = calcP90(adresseList);
let p90Loom = calcP90(loomList);
let p901083 = calcP90(milleList);
let p90Dedicated = calcP90(dedicatedList);
let p90Aatise = calcP90(aatiseList);


console.table("p90 value of each brand :\n" + "Adresse : " + Object.values(p90Adresse) +
  "\nLoom : " + Object.values(p90Loom) + "\n1083 : " + Object.values(p901083) + "\nDedicated : " +
  Object.values(p90Dedicated) + "\nAatise : " + Object.values(p90Aatise));


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

let newProductCount = 0;  
let newReleasedProducts = false;
let date = new Date();
let currDate = date.toISOString().split('T')[0]; 
for (const i in COTELE_PARIS) {
    var difference = Math.abs(currDate - COTELE_PARIS[i].released);
    const days = difference / (1000 * 3600 * 24)
    if (days < 14) newProductCount += 1;
};
if (newProductCount == COTELE_PARIS.length) newReleasedProducts = true;
console.log("New released products : " + newReleasedProducts);


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let productsUnder100 = 0;
let reasonable = false;
for (const i in COTELE_PARIS) {
    if (COTELE_PARIS[i].price < 100) productsUnder100 += 1;
}
if (productsUnder100 == COTELE_PARIS.length) reasonable = true;
console.log("Reasonable price : " + reasonable);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

var filtered = COTELE_PARIS.filter(function(ele){return ele.uuid != 'b56c6d88-749a-5b4c-b571-e5b5c6483131';});
console.log("Find a specific product : " + filtered)

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

function clone(obj) {
  try {
      var copy = JSON.parse(JSON.stringify(obj));
  } catch (ex) {
      alert("");
  }
  return copy;
}
let newList = clone(COTELE_PARIS);
let indinceObjToSuppress = 0;
for (const i in COTELE_PARIS) {
  if (COTELE_PARIS[i].uuid == "b56c6d88-749a-5b4c-b571-e5b5c6483131") indinceObjToSuppress = i;
}
newList.splice(indinceObjToSuppress, 1);
console.log("New list of product : ");
console.table(newList);

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log("BlueJacket variable : " + blueJacket)
console.log("Jacket variable : " + jacket);
// by making a change to jacket, the same change is  applied to blue jacket
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties


jacket = Object.assign({},blueJacket);
jacket.favorite = true;

console.log("BlueJacket variable : " + blueJacket)
console.log("Jacket variable : " + jacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage

localStorage.setItem("favorite brands : " + MY_FAVORITE_BRANDS)

// 2. log the localStorage

console.log(window.localStorage)
