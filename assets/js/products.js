let json

getAllProducts()
    .then(products => renderProducts(products))
    .catch(error => console.error('Error cargando el archivo JSON:', error))

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') ? params.get('category').toLowerCase() : null;
}

function toggleShowAllButton()
{
    const categoryParam = getCategoryFromURL();
    const breadcrumb = document.querySelector("#breadcrumb");

    if (!breadcrumb) return;

    if (categoryParam) {
        const lastBreadcrumb = breadcrumb.querySelector("li:last-child");
        lastBreadcrumb.innerHTML = "<a href='products.html'>Products</a>";

        const categoryLabel = document.createElement("li");
        categoryLabel.classList.add("breadcrumb__content--menu__items");
        categoryLabel.innerHTML = `<span>${categoryParam[0].toLocaleUpperCase() + categoryParam.slice(1)}</span>`;

        breadcrumb.appendChild(categoryLabel)
    }
}

toggleShowAllButton();

/**
 * It renders all the products in the page as a grid/list
 *
 * @param {Product} data Products list
 */
function renderProducts (data)
{
    let productsRow = document.getElementById('products');
    let productsHtml = '';

    const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];
    const categoryParam = getCategoryFromURL();
    const filteredProducts = categoryParam ? data.filter(product => product.categories.map((category) => category.toLowerCase()).includes(categoryParam)) : data;

    if (filteredProducts.length === 0) {
        productsHtml = `
            <div style="height: 60vh;">
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    
                    <div>Oops! There are no products found ${categoryParam ? "for the selected category, try with another one." : "."}</div>
                </div>
            </div>
        `
    }

    for (var i = 0; i < filteredProducts.length; i++)
    {
        const product = filteredProducts[i]
        const qtyInCart = productsInCart.find(item => item.id === product.id)?.qty || 0
        const actualStock = product.stock-qtyInCart
        const lastUnits = actualStock > 0 && actualStock <= 10
        productsHtml += `
        <div class="card p-0 bg-light shadow me-3 mt-3 card-fixer" id="${product.id}">
            ${lastUnits ? `<div class="last-units__label">Last units</div>` : ""}
            <div class="img-container">
                <img class="card-img-top h-100" src="${product.img}">
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6 justify-content-start">
                        <h4 class="fs-5 fw-bold align-text-bottom products-title">${product.name}</h4>
                    </div>
                    <div class="col-6 align-middle justify-content-end text-end">
                        <p class="card-text align-text-bottom fw-bold">
                            $${product.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
                <div class="row card-description mt-2 mb-4">
                    <p class="card-text mt-2">${product.description}</p>
                </div>
                <div class="row justify-content-center">
                    <button ${actualStock === 0 ? "disabled" : ""} id="product-${product.id}__btn" class="btn add-to-cart-button w-75" data-name="${product.name}"         
                    data-img="${product.img}" data-price="${product.price}"
                    data-id="${product.id}" data-category="${product.category}" data-stock="${actualStock}"
                    >
                        ${actualStock === 0 ? "Out of stock" : "Add to cart"}
                    </button>
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
