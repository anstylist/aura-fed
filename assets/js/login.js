const mockedUser = [
  {
    email: "andry@gmail.com",
    password: "1234",
  },
  {
    email: "paola@gmail.com",
    password: "1234",
  },
  {
    email: "katherine@gmail.com",
    password: "1234",
  },
  {
    email: "brandon@gmail.com",
    password: "1234",
  },
]

const formLogin = document.querySelector("#login-form")

//guardo el json en localstorage
localStorage.setItem('mockedUser', JSON.stringify(mockedUser))


formLogin.addEventListener('submit', (e)=> {
  e.preventDefault()
  const email = document.querySelector('#email').value.trim() 
  const password =  document.querySelector('#password').value.trim()
  validate(email, password)
})

const resultMessageDiv = document.querySelector('#result-message')

function validate(email, password) {
  const savedUsers = JSON.parse(localStorage.getItem("mockedUser"))

  const foundUser = savedUsers.find(u => u.email === email && u.password === password)

  const alert = document.createElement('div')
  alert.classList.add("alert")

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser))
    alert.classList.add("alert-success")
    alert.innerText = "Successful login"

    resultMessageDiv.appendChild(alert)

    setTimeout(() => {
      document.location.href = "/index.html"
    }, 2000)
  } else {
    alert.classList.add("alert-danger")
    alert.innerText = "Invalid credential"
    document.querySelector('#email').value = ""
    document.querySelector('#password').value = ""

    resultMessageDiv.appendChild(alert)
  }
}
