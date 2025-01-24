fetch('assets/js/data/categories.json')
    .then(response => response.text())
    .then(text => renderCategories(JSON.parse(text)))
    .catch(error => console.error('Error cargando el archivo JSON:', error));

function renderCategories(data)
{
    let categoriesRow = document.getElementById("categories");
    let categoriesHtml = '';

    for (var i = 0; i < data.length; i++) {
        categoriesHtml += '<div id="cat' + data[i].id + '" class="card makeup-card-minimal me-4 ps-0 pe-0">\n' +
                            '<div class="card-img-top card-image" id="img-' + data[i].id + '">\n' +
                               '<img class="product-image" src="' + data[i].imgCover + '">\n'+
                            '</div>\n'+
                            '<div class="card-body card-content pt-1 pb-0">\n'+
                                '<h4 class="fs-5 fw-bold">' + data[i].name + '</h4>\n'+
                                '<p class="about__content--title--np--secundary">' + data[i].description + '</p>\n'+
                            '</div>\n'+
                          '</div>';
    }

    categoriesRow.innerHTML = categoriesHtml;

    // Asignar dinámicamente una nueva clase con la imagen de fondo para el hover
    for (var i = 0; i < data.length; i++) {
        let cardImage = document.getElementById("img-" + data[i].id);
        let hoverClass = "hover-bg-" + data[i].id;

        // Crear un nuevo estilo CSS en el documento
        let style = document.createElement("style");
        style.innerHTML = `
            .${hoverClass}:hover {
                background-image: url('${data[i].imgHover}');
                background-size: cover;
                background-position: center;
            }
        `;
        document.head.appendChild(style);

        // Agregar la nueva clase al elemento
        cardImage.classList.add(hoverClass);
    }
}

