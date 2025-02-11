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

registerForm.addEventListener('submit', (event) =>
{
    event.preventDefault(); // Evita el envío del formulario por defecto

    //Validación campo nombre
    var name = document.getElementById("fullname").value;
    var nameErrorSpan = document.getElementById("name-error");
    if (name.length == 0)
    {
        errors = true;
        nameErrorSpan.innerText = "The field name can´t be empty";
        nameErrorSpan.style.display = "block"
    }

    //Validación campo telefono
    var phone = document.getElementById("phone").value;
    var phoneErrorSpan = document.getElementById("phone-error");
    var phoneErrorMessages = '';
    if (isNaN(phone) || phone.trim() === "")
    {
        errors = true;
        phoneErrorMessages += "The field phone should contain numbers only\n";
    }

    if (phone.length < 10 || phone.length <= 0)
    {
        errors = true;
        phoneErrorMessages += "The field phone should have 10 digits at least and can't be empty\n";
    }

    //Mostrar los errores
    if(phoneErrorMessages.length > 0)
    {
        phoneErrorSpan.innerText = phoneErrorMessages;
        phoneErrorSpan.style.display = 'block';
    }

    //Vlidación campo correo
    var email = document.getElementById("email").value;
    var emailErrorSpan = document.getElementById("email-error");
    if (!IsValidEmail(email))
    {
        errors = true;
        emailErrorSpan.innerText = "The field email is not valid";
        emailErrorSpan.style.display = "block";
    }

    //validación contraseña
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;
    var pwdErrorSpan = document.getElementById("pwd-error");
    var pwdErrorMessages = '';
    if (password.length == 0 || confirmpassword.length == 0)
    {
        errors = true;
        pwdErrorMessages += "The password's fields can´t be empty";
    }

    if (confirmpassword != password)
    {
        errors = true
        pwdErrorMessages += "The passwordś fields should be equals";
    }

    //Mostrar los errores
    if (pwdErrorMessages.length > 0)
    {
        pwdErrorSpan .innerText = pwdErrorMessages;
        pwdErrorSpan.style.display = "block";
    }

    //Validacion terminos y condiciones
    var terms = document.getElementById("terms");
    var termsErrorSpan = document.getElementById("terms-error");
    if(!terms.checked)
    {
        errors = true;
        termsErrorSpan.innerText = "You should accept the terms and conditions";
        termsErrorSpan.style.display = "block";
    }

    if (errors)
    {
        hideErrors(errors);
    } else {
        var jsonFormData = {
            "name" : name,
            "phone": phone,
            "email": email,
            "password" : password
        }

        const existentData = JSON.parse(localStorage.getItem("users")) || [];
        existentData.push(jsonFormData);

        window.localStorage.setItem("users", JSON.stringify(existentData));
        window.location.href = window.location.href.replace("register.html", "login.html");
    }
});

function displaySuccess()
{
    var successContainer = document.getElementById("successContainer");
    successContainer.style.display = "block";

    var success = document.getElementById("success");
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

