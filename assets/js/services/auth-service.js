function registerApp(jsonFormData) {
  return fetch(`${API_URL_HOST}/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(jsonFormData)
  })
  .then(async (response) => {
    const data = await response.json();
    if (response.ok) {
        return {
          ...data,
          ok: true,
        }
    }

    return data
  })
}


async function loginApp({ email, password}) {
  const response = await fetch(`${API_URL_HOST}/auth/login`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password })
  });

  if (!response.ok) {
    return response
  }
  
  const data = await response.json();

  return {
    ...data,
    ok: true,
  }
}

async function loginApp({ email, password}) {
  const response = await fetch(`${API_URL_HOST}/auth/login`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password })
  });

  if (!response.ok) {
    return response
  }
  
  const data = await response.json();

  return {
    ...data,
    ok: true,
  }
}

async function getUserInformation() {
  const response = await fetch(`${API_URL_HOST}/user/me`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("user-token") ? `Bearer ${sessionStorage.getItem("user-token")}`: undefined,
    },
  });

  if (!response.ok) {
    return response
  }
  
  const data = await response.json();

  return {
    ...data,
    ok: true,
  }
}
