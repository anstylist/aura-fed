fetch('/assets/js/data/products.json')
  .then(response => response.text())
  .then(text => renderInfluencer(JSON.parse(text).filter(product => product.influencer)))
  .catch(error => console.error('Error cargando el archivo JSON:', error))

/**
 * It renders all the products in the page as a grid/list
 * 
 * @param {Product} data Products list
*/
function renderInfluencer (data) {
  let productsRow = document.getElementById('banner-influencers')
  let productsHtml = ''

  const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || []

  for (var i = 0; i < data.length; i++) {
    const product = data[i]
    const qtyInCart = productsInCart.find(item => item?.id === product.id)?.qty || 0
    const actualStock = product.stock-qtyInCart
    const lastUnits = actualStock > 0 && actualStock <= 10
    productsHtml += `
      <div class="banner-box">
        <img class="img-card main" src="${product.influencer.images[0]}" alt="${product.name} Influencer Image" />
        <img class="img-card hover" src="${product.influencer.images[1]}" alt="${product.name} Influencer Image" />
        <button type="button" class="btn-influencers" data-bs-toggle="modal" data-bs-target="#influencers-modal-${i}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle play-icon" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
          </svg>
        </button>
        <div class="modal fade influencers-modal" id="influencers-modal-${i}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header modal-header-influencers">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body modal-container-influencers">
                <video id="my-video-${i}" src="${product.influencer.video}" volume="0.1" controls></video>
                <div class="col-md-4">
                  <div class="card card-influencer">
                    <img
                      src="${product.img}"
                      class="card-img-top"
                      alt=""
                    />
                    <div class="card-body card-body-influencers">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                      <p class="card-text">
                        <small class="text-muted">
                          Price: $${product.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                        </small>
                      </p>
                      <button class="add-to-cart-button btn btn-primary" id="product-${product.id}__btn"
                        ${actualStock === 0 ? "disabled" : ""}
                        data-name="${product.name}"         
                        data-img="${product.img}"
                        data-price="${product.price}"
                        data-id="${product.id}"
                        data-category="${product.category}"
                        data-stock="${actualStock}"
                      >Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  

  // esta linea indica que ya los productos estan renderizados
  productsRow.innerHTML = productsHtml

  setInfluencersModalsBehavior()

  // empezamos agregar eventos a los botones de los productos
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button')
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart)
  })

  // Setear los valores iniciales cuando hay productos ya agregados al carrito (localstorage)
  updateProductsCounter(productsInCart)
  renderShoppingCart(productsInCart)
}

