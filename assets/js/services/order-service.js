function checkoutOrder(data) {
  return fetch(`${API_URL_HOST}/orders`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
    body: JSON.stringify(data)
  })
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        ok: true,
      }
    }

    return response
  })
}

function getCustomerOrders() {
  return fetch(`${API_URL_HOST}/orders`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    }
  })
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return {
        data: [...data],
        ok: true,
      }
    }

    return response
  })
}