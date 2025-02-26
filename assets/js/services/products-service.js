async function getAllProducts() {
  const response = await fetch(`${API_URL_HOST}/products`, {
    headers: {
      'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
  })
  const data = await response.json()
  
  const result = data.map((product) => {
    return {
      ...product,
      img: product.images[0].url,
      categories: product.categories.map((category) => category.name),
      category: product.categories[0].name,
    };
  })

  return result;
}
