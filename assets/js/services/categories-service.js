async function getAllCategories() {
  const response = await fetch(`${API_URL_HOST}/categories`, {
    headers: {
      'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
  })
  const data = await response.json()

  return data;
}
