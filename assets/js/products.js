let json

fetch('assets/js/data/products.json')
  .then(response => response.text())
  .then(text => renderProducts(JSON.parse(text)))
  .catch(error => console.error('Error cargando el archivo JSON:', error))

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

  updateProductsCounter(productsInCart)
  renderShoppingCart(productsInCart)
}

function handleAddToCart (event) {
  const addButton = event.target
  const product = {
    ...addButton.dataset,
    id: parseInt(addButton.dataset.id),
    price: parseFloat(addButton.dataset.price),
    stock: parseInt(addButton.dataset.stock),
    qty: 1
  }

  if (product.stock <= 0) {
    const toastEl = document.querySelector('#no-products-toast')
    const toast = new bootstrap.Toast(toastEl)
    toast.show()
    return
  }

  console.log('Adding product: ', product)

  const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || []
  const indexInCart = productsInCart.findIndex(item => item.id === product.id)
  console.log({ productsInCart, indexInCart })

  if (indexInCart !== -1) {
    // El producto ya fue agregado previamente
    productsInCart[indexInCart] = {
      ...productsInCart[indexInCart],
      qty: ++productsInCart[indexInCart].qty
    }
  } else {
    productsInCart.push(product)
  }

  // guardar en el local storage nuestro nuevo listado de productos actualizado
  localStorage.setItem('productsInCart', JSON.stringify(productsInCart))

  updateStock(product)
  updateProductsCounter(productsInCart)
  renderShoppingCart(productsInCart)
}

function updateStock(product, qty = 1) {
    const productButton = document.querySelector(`#product-${product.id}__btn`)
    productButton.setAttribute('data-stock', product.stock-qty)
}

function updateProductsCounter (productsInCart) {
  const counter = productsInCart.reduce((acc, product) => {
    return acc + product.qty
  }, 0)

  const counterElement = document.querySelector('#cart-count')
  counterElement.innerHTML = counter
}

function renderShoppingCart(productsInCart) {
    const productsListElement = document.querySelector('#minicart__products-list')
    productsListElement.innerHTML = ""
    
    if (productsInCart.length <= 0) {
        productsListElement.innerHTML = `
            <div class="minicart__noproducts">
                There are no products in the shopping cart
            </div>
        `
        return
    }
    
    const productsPaymentElement = document.querySelector('#minicart__products-payment')
    let subTotal = 0
    productsInCart.forEach((product) => {
        const productContainer = document.createElement('div')

        productContainer.classList.add('minicart__product')
        productContainer.innerHTML = `
            <div class="minicart__product--items d-flex">
                <div class="minicart__thumb">
                    <a href="#">
                        <img src="${product.img}" alt="${product.name} image">
                    </a>
                </div>
                <div class="minicart__text">
                    <h4 class="minicart__subtitle">
                        <a href="#">
                            ${product.name}
                        </a>
                    </h4>
                    <div class="minicart__price">
                        <span class="minicart__current--price">$${product.price}</span>
                        <span class="minicart__old--price">$${product.price*1.5}</span>
                    </div>
                    <div class="minicart__text--footer d-flex align-items-center">
                        <div class="quantity__box minicart__quantity">
                            <button type="button" class="quantity__value decrease" aria-label="quantity value"
                                value="Decrease Value">-</button>
                            <label>
                                <input readonly type="number" class="quantity__number" value="${product.qty}" min="1" max="${product.stock}" data-counter />
                            </label>
                            <button type="button" class="quantity__value increase" aria-label="quantity value"
                                value="Increase Value">+</button>
                        </div>
                        <button class="minicart__product--remove" type="button" aria-label="Remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>`
        productsListElement.appendChild(productContainer)
        subTotal = subTotal + (product.qty * product.price)
    })
    productsPaymentElement.innerHTML = `
        <div class="minicart__amount">
            <div class="minicart__amount_list d-flex justify-content-between">
                <span>Sub Total:</span>
                <span><b>$${subTotal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</b></span>
            </div>
            <div class="minicart__amount_list d-flex justify-content-between">
                <span>Total:</span>
                <span><b>
                    $${(subTotal*1.11).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </b></span>
            </div>
        </div>`
}


