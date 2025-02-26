async function getDiscountCodeInfo(code) {
  const response = await fetch(`${API_URL_HOST}/discount-code/${code}`, {
    headers: {
      'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
  })

  if (!response.ok) {
    return null;
  }

  const data = await response.json()

  return data;
}