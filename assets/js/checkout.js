(() => {

})()

const discountCodeForm = document.querySelector("#discount-code-form");
const productsTable = document.querySelector("#cart__table--body");
const checkoutSubtotalSpot = document.querySelector("#checkout-sub-total");
const checkoutTotalSpot = document.querySelector("#checkout-total");
const checkoutDiscountSpot = document.querySelector("#checkout-discount");
const codeInput = document.querySelector("#discount-code__input");
const checkoutToastId = "checkout-result-toast";
const checkoutToast = document.querySelector("#checkout-result-toast");
const checkoutToastMessage = document.querySelector("#message-checkout-result-toast");
const finalCheckoutButton = document.querySelector("#final-checkout__btn");
const checkoutFormId = "checkout-shipping-payment-form";
const checkoutForm = document.querySelector("#checkout-shipping-payment-form");

let checkoutSubTotal = 0;
let checkoutTotal = 0;
let discountCodeInfo;

discountCodeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = codeInput.value;

  discountCodeInfo = await getDiscountCodeInfo(code);

  if (!discountCodeInfo) {
    checkoutToastMessage.innerHTML = "Invalid Code";
    checkoutToast.classList.remove("text-bg-success");
    checkoutToast.classList.add("text-bg-danger");
  } else {
    checkoutToastMessage.innerHTML = "Great! You have a discount.";
    checkoutToast.classList.remove("text-bg-danger");
    checkoutToast.classList.add("text-bg-success");
  }

  showToast(checkoutToastId);
  codeInput.value = "";
  renderCheckoutProductsTable(productsInCart);
});

function renderCheckoutProductsTable(productsInCart) {
  checkoutSubTotal = 0;
  checkoutTotal = 0;
  productsTable.innerHTML = "";

  if (productsInCart.length <= 0) {
    productsTable.innerHTML = `
      <tr class="cart__table--body__items">
        <td class="cart__table--body__list">
          <div class="cart__product d-flex align-items-center no-products">
            No products added to your shopping cart yet
          </div>
        </td>
      </tr>
    `
    return
  }

  productsInCart.forEach((product, index) => {
      const productContainer = document.createElement('tr');

      productContainer.classList.add(`cart__table--body__items`);
      productContainer.innerHTML = `
          <td class="cart__table--body__list">
            <div class="cart__product d-flex align-items-center">
              <div class="product__thumbnail border-radius-5">
                <div class="display-block" href="product-details.html">
                  <img class="display-block border-radius-5" src="${product.img}" alt="cart-product">
                </div>
                <span class="product__thumbnail--quantity">${product.qty}</span>
              </div>
              <div class="product__description">
                <h4 class="product__description--name">
                  ${product.name}
                </h4>
              </div>
            </div>
          </td>
          <td class="cart__table--body__list">
            <div class="table-actions">
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
              <span class="cart__price">
                <span class="cart__price--qty">${product.qty} x </span>
                $${product.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </span>
            </div>
          </td>`
      productsTable.appendChild(productContainer)
      checkoutSubTotal = checkoutSubTotal + (product.qty * product.price)
  })

  checkoutSubtotalSpot.innerHTML = `$${checkoutSubTotal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  checkoutTotal = checkoutSubTotal;
  if (discountCodeInfo) {
    const discount = (discountCodeInfo.discountPercent/100) * checkoutSubTotal;
    checkoutTotal = checkoutTotal - discount;
    checkoutDiscountSpot.innerHTML = `-${discountCodeInfo.discountPercent}%`;
  } else {
    checkoutDiscountSpot.innerHTML = `-0%`;
  }

  checkoutTotalSpot.innerHTML = `$${checkoutTotal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
}

checkoutForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const checkoutData = formToJson(checkoutFormId);

  checkoutData.zipCode = parseInt(checkoutData.zipCode, 10);
  checkoutData.discountId = discountCodeInfo?.id || null;
  checkoutData.paymentMethodId = 3;
  checkoutData.products = productsInCart.map((product) => {
    return {
      productId: product.id,
      quantity: product.qty,
    }
  });

  const response = await checkoutOrder(checkoutData);

  console.log("--- AP - ORDER RESPONSE: ", response);

  if (response.ok) {
    checkoutToastMessage.innerHTML = "The order has been created successfully. Your products are already on their way.";
    checkoutToast.classList.remove("text-bg-danger");
    checkoutToast.classList.add("text-bg-success");

    localStorage.removeItem("productsInCart");
    setTimeout(() => {
      document.location.href = "/my-profile.html"
    }, 3000);
  } else {
    checkoutToastMessage.innerHTML = "An error occurred during the order creation process.";
    checkoutToast.classList.remove("text-bg-success");
    checkoutToast.classList.add("text-bg-danger");
  }

  showToast(checkoutToastId);
});