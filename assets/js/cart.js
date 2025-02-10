
/**
 * Funcion principal del feature agregar a carrito de compras
 * 
 * @param {*} event 
 * @returns 
 */
function handleAddToCart (event) {
  const addButton = event.target

  addButton.disabled = true;

  const product = {
    ...addButton.dataset,
    id: parseInt(addButton.dataset.id),
    price: parseFloat(addButton.dataset.price),
    stock: parseInt(addButton.dataset.stock),
    qty: 1
  }

  if (product.stock <= 0) {
    showToast('no-products-toast')
    addButton.disabled = false;
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

  // Renders despues de agregar el producto al localstorage
  updateStock(product)
  updateProductsCounter(productsInCart)
  renderShoppingCart(productsInCart)

  // mostrar mensaje de proceso realizado exitosamente
  showToast('product-added-toast')
  addButton.disabled = false;
}

/**
 * It updates the product stock in the "Add to cart" button
 * 
 * @param {*} productsInCart 
 */
function updateStock(product, qty = 1) {
    const productButton = document.querySelector(`#product-${product.id}__btn`)
    productButton.setAttribute('data-stock', product.stock - qty)
}

/**
 * It updates the product counter tag in the page header
 * 
 * @param {*} productsInCart 
 */
function updateProductsCounter (productsInCart) {
  const counter = productsInCart.reduce((acc, product) => {
    if (product?.qty) {
        return acc + product.qty
    }
    return acc
  }, 0)

  const counterElement = document.querySelector('#cart-count')
  counterElement.innerHTML = counter
}

/**
 * It renders the shopping cart products list and the summary for payment
 * 
 * @param {*} productsInCart the products added in the shopping cart (in localstorage)
 * @returns 
 */
function renderShoppingCart(productsInCart) {
    const productsListElement = document.querySelector('#minicart__products-list')
    const productsPaymentElement = document.querySelector('#minicart__products-payment')
    productsListElement.innerHTML = ""
    
    if (productsInCart.length <= 0) {
        productsListElement.innerHTML = `
            <div class="minicart__noproducts">
                There are no products in the shopping cart
            </div>
        `
        productsPaymentElement.innerHTML = ""
        return
    }

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
                    <div class="minicart__text--footer minicart__product-controls d-flex align-items-center" data-product-id="${product.id}">
                        <div class="quantity__box minicart__quantity" data-product-id="${product.id}">
                            <button type="button" class="quantity__value decrease" aria-label="quantity value"
                                value="Decrease Value"
                                data-product-id="${product.id}"
                                data-in-minicart
                            >-</button>
                            <label>
                                <input readonly type="number" class="quantity__number" value="${product.qty}" min="1" max="${product.stock}" data-counter />
                            </label>
                            <button type="button" class="quantity__value increase" aria-label="quantity value"
                                value="Increase Value"
                                data-product-id="${product.id}"
                                data-in-minicart
                            >+</button>
                        </div>
                        <button
                            class="minicart__product--remove remove-product"
                            type="button"
                            aria-label="Remove"
                            data-product-id="${product.id}"
                            data-in-minicart
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16" data-in-minicart>
                                <path data-in-minicart
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
    
    addEventListenerToShoppingCart(productsInCart)
}

/**
 * It adds the event listeners to the shopping cart control buttons (increase, decrease and delete)
 * 
 * @param {*} productsInCart 
 */
function addEventListenerToShoppingCart(productsInCart) {
    const quantityWrapper = document.querySelectorAll(".minicart__product-controls");
    if (quantityWrapper) {
        quantityWrapper.forEach(function (singleItem) {
            let increaseButton = singleItem.querySelector(".increase");
            let decreaseButton = singleItem.querySelector(".decrease");
            let removeButton = singleItem.querySelector(".remove-product");

            const productId = parseInt(singleItem.dataset.productId, 10)
            const productIndex = productsInCart.findIndex(item => item.id === productId)

            // INCREASE BUTTON
            increaseButton.addEventListener("click", function (e) {
                let input = e.target.previousElementSibling.children[0];
                const maxValue = parseInt(input.getAttribute("max"), 10);
                if (input.dataset.counter != undefined) {
                    let value = parseInt(input.value, 10);
                    value = isNaN(value) ? 1 : value;
                    if (value >= maxValue) {
                        showToast('no-products-toast')
                        return;
                    }

                    value++;
                    input.value = value;

                    productsInCart[productIndex] = {
                        ...productsInCart[productIndex],
                        qty: value,
                    }
                    localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                    updateStock(productsInCart[productIndex], value)
                    updateProductsCounter(productsInCart)
                    renderShoppingCart(productsInCart)
                }
            });

            // DECREASE BUTTON
            decreaseButton.addEventListener("click", function (e) {
                let input = e.target.nextElementSibling.children[0];
                if (input.dataset.counter != undefined) {
                    let value = parseInt(input.value, 10);
                    value = isNaN(value) ? 1 : value;
                    value < 1 ? (value = 1) : "";
                    value--;
                    input.value = value;

                    productsInCart[productIndex] = {
                        ...productsInCart[productIndex],
                        qty: value,
                    }
                    localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                    updateStock(productsInCart[productIndex], value)
                    updateProductsCounter(productsInCart)
                    renderShoppingCart(productsInCart)
                }
            });

            // TRASH BUTTON
            removeButton.addEventListener("click", function (e) {
                console.log("-- AP - ", {productsInCart, productIndex, productId});
                const productToDelete = {
                    id: productsInCart[productIndex].id,
                    stock: productsInCart[productIndex].stock,
                };
                productsInCart.splice(productIndex, 1)
                localStorage.setItem("productsInCart", JSON.stringify(productsInCart))

                updateStock(productToDelete, 0)
                updateProductsCounter(productsInCart)
                renderShoppingCart(productsInCart)
            })
        });
    }
}