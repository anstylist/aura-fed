(async () => {
  const userNameSpot = document.querySelector("#user-name");

  const userInformation = await getUserInformation();
  const customerOrders = await getCustomerOrders();

  userNameSpot.innerHTML = `${userInformation.firstName} Profile`;

  renderCustomerOrders(customerOrders.data);
})()

function renderCustomerOrders(orders) {
  const desktopOrderListBody = document.querySelector("#desktop-order-list-body");

  if (orders.length === 0) {
    desktopOrderListBody.innerHTML =`
      <tr class="account__table--body__child">
          <td colspan="4" class="account__table--body__child--items">No orders yet</td>
      </tr>
    `;
    return;
  }

  orders.forEach(order => {
    const orderRow = document.createElement('tr');

    orderRow.classList.add('account__table--body__child');
    orderRow.innerHTML = `
      <td class="account__table--body__child--items">#${order.id.toString().padStart(4, '0')}</td>
      <td class="account__table--body__child--items">${formatDate(new Date(order.createdAt))}</td>
      <td class="account__table--body__child--items">${order.status}</td>
      <td class="account__table--body__child--items">$${order.totalPrice.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })} USD</td>
    `;

    desktopOrderListBody.appendChild(orderRow);
  });
}

function formatDate(date) {
  return dateFns.format(date, 'MMMM d, yyyy', {});
}
