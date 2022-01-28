// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectByReasonnablePrice = document.querySelector('#filter-reasonnable-price-select');
const selectByRecentlyReleased = document.querySelector('#filter-recently-released-select');
const selectSort = document.querySelector('#sort-select');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}€</span>
        <span>, ${product.released}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render pagination
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render indicator
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

/**
 * Render brandselector
 * @param {Array} products 
 */

 const renderBrands = products => {
  const brandsNames = [];
  products.forEach(product => {
    if (!brandsNames.includes(product.brand)){
      brandsNames.push(product.brand);
    }
  })
  let options = ['<option value="select a brand">select a brand</option>']
    options.push(Array.from(
        { 'length': brandsNames.length },
        (value, index) => `<option value="${brandsNames[index]}">${brandsNames[index]}</option>`
    ).join(''));
    options.push('<option value="show all brands">show all brands</option>')

    selectBrand.innerHTML = options;
};

/**
 * List of renders
 */

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(products); //feature 2
};



/**
 * Declaration of all Listeners
 */

/** Feature 0 : Select the number of products to display
 * 
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(1, parseInt(event.target.value)) // 1 to reinitialize to page 1 when we change the pageSize
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/** Feature 1 : Select the page to display
* 
* 
*/
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

/** Feature 2 : filter by brand
 * 
 * 
 */

selectBrand.addEventListener('change', async (event) => {
  var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

  if (event.target.value == "show all brands") {
      products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize)   
  }
  else {
      products.result = products.result.filter(item => item.brand == event.target.value)
  }

    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});

/** Feature 3 : Filter by reasonnable price 
 * 
 */

selectByReasonnablePrice.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

  if (event.target.value == "By reasonable price"){
    products.result = products.result.filter(product => product.price <= 50);
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);

});

/** Feature 4 : Filter by recently released
 * 
 */

function recentlyReleased(product_date){
  let now = new Date();
  product_date = new Date(product_date);
  return now - product_date;
}


selectByRecentlyReleased.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

  if (event.target.value == "By recently released"){
    products.result = products.result.filter(product => recentlyReleased(product.released) <= (24 * 60 * 60 * 1000 * 14));
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);

});

/** Feature 5 & 6 : Sort by date and price (asc and desc)
 * 
 */

function compareDate(p1,p2){
  return p1.price - p2.price;
}

function comparePrice(p1,p2){
  p1_date = new Date(p1.released);
  p2_date = new Date(p2.released);
  return p1_date - p2_date;
}

selectSort.addEventListener('change', async (event) => {
  switch (event.target.value) {
      case 'price-asc':
          currentProducts = currentProducts.sort((a, b) => { return a.price - b.price; });
          break;
      case 'price-desc':
          currentProducts = currentProducts.sort((a, b) => { return b.price - a.price; });
          break;
      case 'date-asc':
          currentProducts = currentProducts.sort((a, b) => { return new Date(b.released) - new Date(a.released); });
          break;
      case 'date-desc':
          currentProducts = currentProducts.sort((a, b) => { return new Date(a.released) - new Date(b.released); });
          break;
      default:
          break;
  }
  render(currentProducts, currentPagination);
})


