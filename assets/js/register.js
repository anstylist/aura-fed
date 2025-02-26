const registerForm = document.querySelector('#register-form');
var errors = false;

//Ocultar mensajes de error al hacer click en cualquier input del formulario
var inputs = document.getElementsByClassName("form-control");
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
    const password = document.querySelector("#password-register").value;
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

function displaySuccess()
{
    var successContainer = document.querySelector("#successContainer");
    successContainer.style.display = "block";

    var success = document.querySelector("#success");
    var html = '<h3>Registro Exitoso</h3>\n';

    success.innerHTML = html;

    setTimeout(function() {
        successContainer.style.display = 'none';
    }, 4000);
}

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

function IsValidEmail(email) {
    if (typeof email !== "string") return false; // Verificar que sea un string

    const partes = email.split("@");

    if (partes.length !== 2) return false; // Debe haber exactamente un '@'

    const [usuario, dominio] = partes;

    if (!usuario || !dominio) return false; // No debe haber '@' al inicio o final

    const dominioPartes = dominio.split(".");
    if (dominioPartes.length < 2) return false; // Debe haber al menos un punto en el dominio

    const extension = dominioPartes.pop(); // Última parte después del último '.'

    // Verificar que usuario, dominio y extensión no estén vacíos
    return usuario.length > 0 && dominioPartes.join(".").length > 0 && extension.length > 1;
}


