let json;

fetch('assets/js/data/products.json')
    .then(response => response.text())
    .then(text => renderProducts(JSON.parse(text)))
    .catch(error => console.error('Error cargando el archivo JSON:', error));


function renderProducts(data)
{
    let productsRow = document.getElementById("products");
    let productsHtml = '';

    for (var i=0; i<data.length; i++)
    {
        productsHtml += '<div class="card p-0 me-3 bg-light shadow mt-3 card-fixer" id="' + data[i].id + '" data-category=" ' + data[i].category + ' " data-stock=" ' + data[i].stock + ' ">\n' +
            '                <div class="img-container">\n' +
            '                   <img class="card-img-top h-100" src=" ' + data[i].img + ' ">\n' +
            '                </div>\n' +
            '                <div class="card-body">\n' +
            '                    <div class="row">\n' +
            '                        <div class="col-8 justify-content-start">\n' +
            '                            <h4 class="fs-5 fw-bold align-text-bottom"> ' + data[i].name + '</h4>\n' +
            '                        </div>\n' +
            '                        <div class="col-4 align-middle justify-content-end text-end">\n' +
            '                            <p class="card-text align-text-bottom fw-bold">\n' +
            '                                $ ' + data[i].price + ' \n' +
            '                            </p>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="row card-description mt-2 mb-4">\n' +
            '                       <p class="card-text text-justify mt-2">\n' +
            '                           ' +  data[i].description + '  ' +
            '                       </p>\n' +
            '                    </div>\n' +
            '                    <div class="row justify-content-center">\n' +
            '                       <button class="btn add-to-cart-button w-75">Add to cart</button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>';
    }

    productsRow.innerHTML = productsHtml;
}



