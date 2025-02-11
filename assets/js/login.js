const mockedUser = [
  {
    name: "Andry",
    email: "andry@gmail.com",
    password: "1234",
  },
  {
    name: "Paola",
    email: "paola@gmail.com",
    password: "1234",
  },
  {
    name: "Katherine",
    email: "katherine@gmail.com",
    password: "1234",
  },
  {
    name: "Brandon",
    email: "brandon@gmail.com",
    password: "1234",
  },
]

const formLogin = document.querySelector("#login-form")

const existentData = JSON.parse(localStorage.getItem("users")) || []
mockedUser.forEach(user => existentData.push(user))

//guardo el json en localstorage
localStorage.setItem('users', JSON.stringify(existentData))


formLogin.addEventListener('submit', (e)=> {
  e.preventDefault()
  const email = document.querySelector('#email').value.trim() 
  const password =  document.querySelector('#password').value.trim()
  validate(email, password)
})

const resultMessageDiv = document.querySelector('#result-message')

function validate(email, password) {
  const savedUsers = JSON.parse(localStorage.getItem("users"))

  const foundUser = savedUsers.find(u => u.email === email && u.password === password)

  const alert = document.createElement('div')
  alert.classList.add("alert")

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser))
    alert.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show')
  
    alert.innerHTML = `
      Successful login
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `

    resultMessageDiv.appendChild(alert)

    setTimeout(() => {
      document.location.href = "/index.html"
    }, 2000)
  } else {
    alert.classList.add("alert-danger")
    alert.innerHTML = `
      <div class="d-flex justify-content-between"> 
        Invalid credentials
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

    `
    document.querySelector('#email').value = ""
    document.querySelector('#password').value = ""

    resultMessageDiv.appendChild(alert)
  }
}
