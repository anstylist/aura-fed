const loginForm = document.querySelector("#login-form")

loginForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  const email = document.querySelector('#email-login').value.trim() 
  const password =  document.querySelector('#password-login').value
  validateLogin(email, password)
})

async function validateLogin(email, password) {
  const toast = document.querySelector('#login-result-toast')
  const toastMessage = document.querySelector('#message-login-result-toast')

  const response = await loginApp({
      email,
      password
  })

  if (response.ok) {
      const redirectTo = getQueryParameterFromURL("redirect")
      sessionStorage.setItem("user-token", response.token)
      toastMessage.innerHTML = `Welcome ${response.firstName}! You will be redirected in 3 seconds.`
      toast.classList.add('text-bg-success')
      setTimeout(() => {
        document.location.href = `${redirectTo ? redirectTo : "/index.html"}`
      }, 3000);
  } else {
      sessionStorage.removeItem("user-token")
      toastMessage.innerHTML = "Your credentials are not valid."
      toast.classList.add('text-bg-danger')
      loginForm.reset()
  }

  showToast("login-result-toast")
}

(() => {
  document.querySelector('#email-login').focus();
  const redirectTo = getQueryParameterFromURL("redirect")
  if (redirectTo) {
    showToast("login-required-toast")
  }
})()