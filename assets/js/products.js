let json

fetch('assets/js/data/products.json')
    .then(response => response.text())
    .then(text => renderProducts(JSON.parse(text)))
    .catch(error => console.error('Error cargando el archivo JSON:', error))

function renderProducts(data)
{
    let productsRow = document.getElementById("products")
    let productsHtml = ''

    for (var i=0; i<data.length; i++)
    {
        const product = data[i]
        productsHtml += `
        <div class="card p-0 me-3 bg-light shadow mt-3 card-fixer" id="${product.id}" data-category="${product.category}" data-stock="${product.stock}">
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
                    <button class="btn add-to-cart-button w-75" data-name="${product.name}" data-img="${product.img}" data-price="${product.price}"
                    data-id="${product.id}" data-category="${product.category}" data-stock="${product.stock}">Add to cart</button>
                </div>
            </div>
        </div>
        `
    }

    // esta linea indica que ya los productos estan renderizados 
    productsRow.innerHTML = productsHtml;
    
    // empezamos agregar eventos a los botones de los productos 
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(event) {
    const addButton = event.target
    const product = {
        ...addButton.dataset,
        id: parseInt(addButton.dataset.id),
        price: parseFloat(addButton.dataset.price),
        stock: parseInt(addButton.dataset.stock),
        quantity: 1
    }

    if (product.stock <= 0) {
        const toastEl = document.querySelector('#no-products-toast')
        const toast = new bootstrap.Toast(toastEl)
        toast.show()
        return;
    }

    console.log("Adding product: ", product);
    
    const productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || []

    
}
    // function addToCart(product) {
    //     // Get the cart from localStorage (or initialize an empty object)
    //     let cart = JSON.parse(localStorage.getItem('cart')) || {};
      
    //     const existingProduct = cart[product.id];
      
    //     if (existingProduct) {
    //       if (existingProduct.quantity < product.stock) {
    //         existingProduct.quantity++;
    //       } else {
    //         console.warn('Product quantity exceeds stock:', product.name);
    //       }
    //     } else {
    //       cart[product.id] = { ...product, quantity: 1 };
    //     }
      
    //     localStorage.setItem('cart', JSON.stringify(cart));
      
    //     console.log('Cart:', cart);
    //   }
      
    //   function updateCartCount() {
    //     const cartCountElement = document.querySelector('.cart-count');
    //     if (cartCountElement) {
    //       let totalQuantity = 0;
    //       const cart = JSON.parse(localStorage.getItem('cart')) || {}; 
      
    //       for (const productId in cart) {
    //         totalQuantity += cart[productId].quantity;
    //       }
    //       cartCountElement.textContent = totalQuantity;
    //     } else {
    //       console.warn('Cart count element not found');
    //     }
    //   }
      
    
    // function updateCartCount() {
    //     const cartCountElement = document.querySelector('.cart-count'); 
    //     if (cartCountElement) {
    //         let totalQuantity = 0;
    //         for (const productId in cart) {
    //             totalQuantity += cart[productId].quantity;
    //         }
    //         cartCountElement.textContent = totalQuantity;
    //     } else {
    //         console.warn('Cart count element not found');
    //     }
    // }


// function addToCartEvents(data) {
//     const addToCartButtons = document.querySelectorAll('.add-to-cart-button')
//     addToCartButtons.forEach((element) => {
//         element.addEventListener("click", handleAddToCart)
//     })
// }



