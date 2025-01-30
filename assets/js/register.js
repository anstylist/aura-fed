const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto
    var name = document.getElementById("fullname").value;
    var errors = [];

    //Validación campo nombre
    if (name.length == 0)
    {
        errors.push("The field name can´t be empty")
    }

    //Validación campo telefono
    var phone = document.getElementById("phone").value;
    if (isNaN(phone) || phone.trim() === "") {
        errors.push("The field phone should contain numbers only");
    }

    if (phone.length < 10 || phone.length <= 0)
    {
        errors.push("The field phone should have 10 digits at least and can't be empty");
    }

    //Vlidación campo correo
    var email = document.getElementById("email").value;
    if (!IsValidEmail(email))
    {
        errors.push("The field email is not valid");
    }

    //validación contraseña
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;
    if (password.length == 0 || confirmpassword.length == 0)
    {
        errors.push("The password's fields can´t be empty");
    }
    if (confirmpassword != password)
    {
        errors.push("The passwordś fields should be equals")
    }

    if (errors.length > 0)
    {
        displayErrors(errors);
    } else {
        var jsonFormData = {
            "name" : name,
            "phone": phone,
            "email": email,
            "password" : password
        }

        displaySuccess(jsonFormData);
    }
});

function displaySuccess(jsonData)
{
    var successContainer = document.getElementById("successContainer");
    successContainer.style.display = "block";

    var success = document.getElementById("success");
    var html = '<h3>Registro Exitoso</h3>\n' +
        '<span><pre>'+ JSON.stringify(jsonFormData, null, 2) +'</pre></span>';

    success.innerHTML = html;

    setTimeout(function() {
        successContainer.style.display = 'none';
    }, 4000);
}

function displayErrors(errors)
{
    var html = "";
    var errorsDiv = document.getElementById("errors");
    errorsDiv.style.display = "block";
    for (const error of errors)
    {
        html += '<div class="alert alert-danger" role="alert">\n' +
             error  +
            '</div>';
    }
    errorsDiv.innerHTML = html;

    setTimeout(function() {
        errorsDiv.style.display = 'none';
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

