// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// client : https://hamza-client.vercel.app


/**
 * Current page
 */

 let currentProducts = [];
 let favorite_list = [];
 let currentPagination = {};
 currentPagination['currentSize'] = 12;
 currentPagination['currentPage'] = 1;
 currentPagination['paginationChoice'] = "actual"
 let currentBrand = 'all';
 let currentMaxPrice = 600;
 let currentSort = 1;


/**
 * Query selector
 */

 const selectShow = document.querySelector('#show-select');
 const selectPagePrevious = document.querySelector('#previous-page');
 const selectPageNext = document.querySelector('#next-page');
 const selectBrand = document.querySelector('#brand-select');
 const sectionProducts = document.querySelector('#products');
 const selectFilterPrice = document.querySelector('#filter-price-select')
 const selectFilterDate = document.querySelector('#filter-date-select')
 const selectFilterFavorite = document.querySelector('#filter-favorite-select')
 const selectSort = document.querySelector('#sort-select');
 
 const spanNbProducts = document.querySelector('#nbProducts');
 const spanNbNewProducts = document.querySelector('#nbNewProducts');
 const spanp50 = document.querySelector('#p50');
 const spanp90 = document.querySelector('#p90');
 const spanp95 = document.querySelector('#p95');
 const spanLastReleased = document.querySelector('#lastReleased');


/**
 * Set products and meta for the products of the current page
 * 
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */

const setCurrentProducts = ({ result, meta }) => {
    currentProducts = result;
    currentPagination = meta;

};


/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */

 const fetchProducts = async (size = currentPagination.currentSize, page = "actual", brand = currentBrand, price = currentMaxPrice, sort = currentSort) => {
  if (isNaN(price)) {
      currentMaxPrice = 600;
      price = currentMaxPrice
  }
  if (page == "actual") { currentPagination.currentPage = 1 }
  if (page == "next") { currentPagination.currentPage = currentPagination.currentPage + 1 }
  if (page == "previous") { currentPagination.currentPage = currentPagination.currentPage - 1 }
  if (currentPagination.currentPage < 1) { currentPagination.currentPage = 1 }
  let pageNumber = currentPagination.currentPage
  let skip = (pageNumber - 1) * size;
  let limit = size * pageNumber;
  console.log("skip : ", skip, " | limit : ", limit, " | pageNumber : ", pageNumber)
  try {
      let response = await fetch(
          `https://server-seven-chi.vercel.app/products/search?brand=${brand}&price=${price}&sort=${sort}&limit=${limit}&skip${skip}`
      );
      let body = await response.json();
      if (body.length == 0) {
          currentPagination.currentPage = currentPagination.currentPage - 1
          let pageNumber = currentPagination.currentPage
          let skip = (pageNumber - 1) * size;
          let limit = size * pageNumber;
          console.log("skip : ", skip, " | limit : ", limit, " | pageNumber : ", pageNumber)
          response = await fetch(
              `https://server-seven-chi.vercel.app/products/search?brand=${brand}&price=${price}&sort=${sort}&limit=${limit}&skip${skip}`
          );
          body = await response.json()
      }
      console.log(body)
      currentProducts = body;

      currentPagination['currentSize'] = size;
      currentBrand = brand
      currentMaxPrice = price
      currentSort = sort;
      if (body.success !== true) {
          console.error(body);
          return { currentProducts, currentPagination };
      }

      return body;

  } catch (error) {
      console.error(error);
      return { currentProducts, currentPagination };
  }
};


/**
 * Render list of products
 * @param  {Array} products
 */

 const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  let template = `<div class="cards">`
  template += products
      .map(product => {
          if (favorite_list.includes(product._id)) {
              return `
              <div class="card" id=${product._id}>
              
               <h5 class="brand-name">${product.brand}</h5>
              <div class="image-container">
                  <div class="first">
                      <div class="d-flex justify-content-between align-items-center">
                  </div>
                  </div> <img src="${product.image}" class="img-fluid rounded thumbnail-image">
              </div>
              <div class="product-detail-container p-2">
                      <div class="d-flex justify-content-between align-items-center">
                          <a href="${product.link}">${product.name}</br></a>
                          <a class="new-price">${product.price}€</a>
                      </div>
  <button class="wishlist" style="border: none;color:#FF8773" onclick= DeleteFavorite('${product._id}')>${"&#10084;"}</button> 
                  </div>
       
    </div>`;
          }
          else {
              return `
    <div class="card"   id=${product._id}>
                      <h5 class="brand-name">${product.brand}</h5>
<div class="image-container" >
                  <div class="first">
                      <div class="d-flex justify-content-between align-items-center"> 
                              </div>
                          
                  </div> <img src="${product.image}" class="img-fluid rounded thumbnail-image">
              </div><div class="product-detail-container p-2">
                      <div class="d-flex justify-content-between align-items-center">
                          <a href="${product.link}">${product.name}</br></a>
                          <a class="new-price">${product.price}€</a>
                      </div>
<button class="wishlist" style="border: none; color:#8FB8C1" onclick= AddFavorite('${product._id}')>${"&#10084;"}</button>
                  </div>
       
    </div>`;
          }
      }).join('');
  template += `</div>`

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2></br><i class="fa-solid fa-shirt"></i> Products:</h2>';

  sectionProducts.appendChild(fragment);

};


/**
 * Favorite list
 * 
 * @param {*} _id 
 */

function AddFavorite(_id) {
    favorite_list.push(_id);
    render(currentProducts, currentPagination)
}

function DeleteFavorite(_id) {
    render(currentProducts, currentPagination)
}


/**
 * Render page selector
 * @param  {Object} pagination
 */

function renderPagination() {
  const options = ` <button style="border: none; background : none; color:#8FB8C1; font-size : 20px;" onclick= AddFavorite('${product.uuid}')>${"&#10084;"}</button>`
    selectPage.innerHTML = options;
    selectPage.selectedIndex = 0;
};


/**
 * List of brands name filter
 * @param {*} products 
 */

const renderBrands = products => {

    const options = `<option value="all">all brands</option>
        <option value="dedicated">dedicated</option>
        <option value="montlimart">montlimart</option>
        <option value="adresseparis">adresseparis</option>`;
    let i = 0
    if (currentBrand == "all") { i = 0 }
    else if (currentBrand == "dedicated") { i = 1 }
    else if (currentBrand == "montlimart") { i = 2 }
    else if (currentBrand == "adresseparis") { i = 3 }
    selectBrand.innerHTML = options;
    selectBrand.selectedIndex = i;
};


/**
 * Render page selector
 * @param  {Object} pagination
 */
function renderIndicators() {

    spanNbProducts.innerHTML = currentProducts.length;

    spanp50.innerHTML = Percentile(0.50);
    spanp90.innerHTML = Percentile(0.90);
    spanp95.innerHTML = Percentile(0.95);

};

function Percentile(p) {
    let clone = [...currentProducts]
    var sortedProducts = clone.sort((x, y) => x.price - y.price)
    var index = p * sortedProducts.length
    index = Math.round(index)
    var percentile = sortedProducts[index].price
    return percentile.toString() + "&euro;"
}


const render = (products) => {
    renderBrands(products);
    renderProducts(products);
    renderIndicators();

};


/******************************************************************************
 * Features
 */

selectShow.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value))
        .then(() => render(currentProducts));
});


/**
 * Feature 1 : Browse pages
 */

selectPagePrevious.addEventListener('click', event => {
    fetchProducts(currentPagination.currentSize, "previous")
        .then(() => render(currentProducts)); 
});
selectPageNext.addEventListener('click', event => {
    fetchProducts(currentPagination.currentSize, "next")
        .then(() => render(currentProducts)); 
});


/**
 * Feature 2 : Filter by brands
 */


selectBrand.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, "actual", event.target.value)
        .then(() => render(currentProducts));
})


/** 
 * Feature 3 : Filter by reasonnable price 
 */

 selectByReasonnablePrice.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

  if (event.target.value == "By reasonable price"){
    products.result = products.result.filter(product => product.price <= 50);
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);

});


/**
 * Feature 4 : Filter by reasonable price
 

selectFilterPrice.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, currentPagination.currentPage, currentBrand, parseInt(event.target.value))
        .then(() => render(currentProducts));
})


/**
 * Feature 5 : Sort by price
 

selectSort.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, currentPagination.currentPage, currentBrand, currentMaxPrice, parseInt(event.target.value))
        .then(() => render(currentProducts));
})

/** Feature 5 & 6 : Sort by date and price (asc and desc)
 * 
 

 selectSort.addEventListener('change', async (event) => {
  switch (event.target.value) {
    case 'price-asc':
      currentProducts = currentProducts.sort((p1, p2) => { return p1.price - p2.price; });
      break;
    case 'price-desc':
      currentProducts = currentProducts.sort((p1, p2) => { return p2.price - p1.price; });
      break;
    case 'date-asc':
      currentProducts = currentProducts.sort((p1, p2) => { return new Date(p2.released) - new Date(p1.released); });
      break;
    case 'date-desc':
      currentProducts = currentProducts.sort((p1, p2) => { return new Date(p1.released) - new Date(p2.released); });
      break;
    default:
      break;
  }
  render(currentProducts, currentPagination);
});



/**
 * Feature 14 - Filter by favorite
 */

selectFilterFavorite.addEventListener('change', event => {
    fetchProducts()
        .then(() => render(filterFavorite(currentProducts, event.target.value)));
})


function filterFavorite(currentProducts, selector) {
    console.log(selectFilterFavorite.checked)
    if (selectFilterFavorite.checked == false) {

        return currentProducts
    }
    else {
        var filteredProducts = []
        for (var product of currentProducts) {
            if (favorite_list.includes(product._id)) {
                filteredProducts.push(product)
            }
        }
        return filteredProducts
    }
}

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(() => render(currentProducts))
);
