let json

fetch('assets/js/data/products.json')
  .then(response => response.text())
  .then(text => renderProducts(JSON.parse(text)))
  .catch(error => console.error('Error cargando el archivo JSON:', error))

/**
 * It renders all the products in the page as a grid/list
 * 
 * @param {Product} data Products list
*/
function renderProducts (data) {
  let productsRow = document.getElementById('products')
  let productsHtml = ''

  const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || []

  for (var i = 0; i < data.length; i++) {
    const product = data[i]
    const qtyInCart = productsInCart.find(item => item.id === product.id)?.qty || 0
    productsHtml += `
        <div class="card p-0 me-3 bg-light shadow mt-3 card-fixer" id="${product.id}">
            <div class="img-container">
                <img class="card-img-top h-100" src="${product.img}">
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-7 justify-content-start">
                        <h4 class="fs-5 fw-bold align-text-bottom">${product.name}</h4>
                    </div>
                    <div class="col-5 align-middle justify-content-end text-end">
                        <p class="card-text align-text-bottom fw-bold">$${product.price}</p>
                    </div>
                </div>
                <div class="row card-description mt-2 mb-4">
                    <p class="card-text mt-2">${product.description}</p>
                </div>
                <div class="row justify-content-center">
                    <button id="product-${product.id}__btn" class="btn add-to-cart-button w-75" data-name="${product.name}" data-img="${product.img}" data-price="${product.price}"
                    data-id="${product.id}" data-category="${product.category}" data-stock="${product.stock-qtyInCart}">Add to cart</button>
                </div>
            </div>
        </div>
        `
  }

  // esta linea indica que ya los productos estan renderizados
  productsRow.innerHTML = productsHtml

  // empezamos agregar eventos a los botones de los productos
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button')
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart)
  })

  // Setear los valores iniciales cuando hay productos ya agregados al carrito (localstorage)
  updateProductsCounter(productsInCart)
  renderShoppingCart(productsInCart)
}
