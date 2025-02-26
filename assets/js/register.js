const registerForm = document.querySelector('#register-form');
const togglePasswdVisibilityBtn = document.querySelector("#show-password__btn");
const slashEyeIcon = document.querySelector("#slash-eye-icon");
const openEyeIcon = document.querySelector("#open-eye-icon");
const passwordInput = document.querySelector("#password-register");
const registerBtn = document.querySelector("#register-btn");

const validationList = document.getElementById('validationList');
const lengthItem = document.getElementById('length');
const letterItem = document.getElementById('letter');
const numberItem = document.getElementById('number');
const specialItem = document.getElementById('special');

let errors = false;

const passwordValidation = {
    length: false,
    letter: false,
    number: false,
    special: false,
};

//Ocultar mensajes de error al hacer click en cualquier input del formulario
const inputs = document.getElementsByClassName("form-control");
for (input of inputs)
{
    input.addEventListener('focus', (event) => {
        errors = false;
        var errorSpans = document.getElementsByClassName("text-danger");
        for(span of errorSpans)
        {
            span.style.display = "none";
        }
    });
}

registerForm.addEventListener('submit', async (event) =>
{
    event.preventDefault(); // Evita el envío del formulario por defecto

    const toast = document.querySelector('#register-result-toast')
    const toastMessage = document.querySelector('#message-register-result-toast')

    toastMessage.innerHTML = ""
    toast.classList.remove(['text-bg-danger', 'text-bg-success'])

    //Validación campo primer nombre
    const firstName = document.querySelector("#first-name-register").value;
    const lastName = document.querySelector("#last-name").value

    //Validación campo correo
    const email = document.querySelector("#email-register").value;

    //validación contraseña
    const password = passwordInput.value;
    const confirmPassword = document.querySelector("#confirm-password").value;
    const pwdErrorSpan = document.querySelector("#pwd-error");
    const pwdErrorMessages = '';

    if (password.length == 0 || confirmPassword.length == 0) {
        errors = true;
        pwdErrorMessages += "The password's fields can´t be empty";
    }

    if (confirmPassword != password) {
        errors = true
        pwdErrorMessages += "The passwords fields should be equals";
    }

    //Mostrar los errores
    if (pwdErrorMessages.length > 0) {
        pwdErrorSpan .innerText = pwdErrorMessages;
        pwdErrorSpan.style.display = "block";
    }
    
    const response = await registerApp({
        firstName,
        lastName,
        email,
        password
    })

    if (response.ok) {
        toastMessage.innerHTML = "The user has been created successfully you can use the login form to login to the application"
        toast.classList.add('text-bg-success')
        registerForm.reset()
        document.querySelector("#email-login").focus()
    } else {
        toastMessage.innerHTML = `There is an error during the user registration process. ${response.message}`
        toast.classList.add('text-bg-danger')
        document.querySelector("#email-login").focus()
    }

    showToast("register-result-toast")
});

function hideErrors()
{
    var errorSpans = document.getElementsByClassName("text-danger");
    setTimeout(function() {
        for(span of errorSpans)
        {
            span.style.display = "none";
        }
    }, 4000);
}


togglePasswdVisibilityBtn.addEventListener("click", (evt) => {
  const isOpen = evt.target.dataset.status === "open";
  
  if (isOpen) {
    togglePasswdVisibilityBtn.setAttribute("data-status", "closed");
    openEyeIcon.classList.add("hidden");
    slashEyeIcon.classList.remove("hidden");
    passwordInput.setAttribute("type", "text");
    return
  }

  togglePasswdVisibilityBtn.setAttribute("data-status", "open");
  openEyeIcon.classList.remove("hidden");
  slashEyeIcon.classList.add("hidden");
  passwordInput.setAttribute("type", "password");
});

passwordInput.addEventListener('input', validatePassword);

function validatePassword() {
    const password = passwordInput.value;

    // Validation checks
    const isLengthValid = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    passwordValidation.length = isLengthValid;
    passwordValidation.letter = hasLetter;
    passwordValidation.number = hasNumber;
    passwordValidation.special = hasSpecial;

    // Update the validation list
    updateValidationItem(lengthItem, isLengthValid);
    updateValidationItem(letterItem, hasLetter);
    updateValidationItem(numberItem, hasNumber);
    updateValidationItem(specialItem, hasSpecial);

    if (isPasswordCompletelyValid()) {
        registerBtn.removeAttribute("disabled");
    } else {
        registerBtn.setAttribute("disabled", "true");
    }
}

function updateValidationItem(item, isValid) {
    item.classList.remove("valid-password-rule")
    if (isValid) {
        item.classList.add("valid-password-rule");
    }
}

function isPasswordCompletelyValid() {
    return passwordValidation.length && passwordValidation.letter && passwordValidation.number && passwordValidation.special;
}