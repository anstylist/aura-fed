async function getAllCampaigns() {
  const response = await fetch(`${API_URL_HOST}/campaigns`, {
    headers: {
      'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
  })
  const data = await response.json()

  const result = data.map(campaign => {
    return {
      ...campaign,
      product: {
        ...campaign.product,
        img: campaign.product.images[0].url,
        category: campaign.product.categories[0].name,
      },
    }
  })

  return result;
}
