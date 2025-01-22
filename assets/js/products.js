const data = JSON.parse('[\n' +
    '  {\n' +
    '    "id": 1,\n' +
    '    "name": "Intense Lipstick",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/lips_bgaiyu.jpg",\n' +
    '    "description": "This is the most intense lipstick",\n' +
    '    "category": "lips",\n' +
    '    "price": 15000,\n' +
    '    "stock": 100\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 2,\n' +
    '    "name": "Natural Lipstick",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737520081/Lips-3_rgljrc.png",\n' +
    '    "description": "This is the most natural lipstick",\n' +
    '    "category": "lips",\n' +
    '    "price": 13000,\n' +
    '    "stock": 50\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 3,\n' +
    '    "name": "Beard Oil Classic",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737520275/Bearb_jz223v.jpg",\n' +
    '    "description": "A nourishing oil for a soft and shiny beard",\n' +
    '    "category": "beard",\n' +
    '    "price": 18000,\n' +
    '    "stock": 60\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 4,\n' +
    '    "name": "Beard Balm Deluxe",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737521290/Barb-2_k22ihd.png",\n' +
    '    "description": "Style and moisturize your beard with ease",\n' +
    '    "category": "beard",\n' +
    '    "price": 20000,\n' +
    '    "stock": 40\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 5,\n' +
    '    "name": "Hair Wax Matte",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737521920/Hair-2_ot3bff.jpg",\n' +
    '    "description": "Create a strong hold with a natural matte finish",\n' +
    '    "category": "hair",\n' +
    '    "price": 22000,\n' +
    '    "stock": 70\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 6,\n' +
    '    "name": "Volumizing Shampoo",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/shampoo.jpg",\n' +
    '    "description": "Adds volume and shine to your hair",\n' +
    '    "category": "hair",\n' +
    '    "price": 25000,\n' +
    '    "stock": 80\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 7,\n' +
    '    "name": "Hydrating Face Cream",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/face_cream.jpg",\n' +
    '    "description": "Keeps your skin soft and hydrated all day",\n' +
    '    "category": "face",\n' +
    '    "price": 30000,\n' +
    '    "stock": 90\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 8,\n' +
    '    "name": "Anti-aging Serum",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/serum.jpg",\n' +
    '    "description": "Reduces wrinkles and rejuvenates the skin",\n' +
    '    "category": "skin care",\n' +
    '    "price": 45000,\n' +
    '    "stock": 50\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 9,\n' +
    '    "name": "Refreshing Eye Gel",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/eye_gel.jpg",\n' +
    '    "description": "Eliminates puffiness and dark circles",\n' +
    '    "category": "eyes",\n' +
    '    "price": 28000,\n' +
    '    "stock": 75\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 10,\n' +
    '    "name": "Luxury Perfume",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/perfume.jpg",\n' +
    '    "description": "A long-lasting fragrance for special occasions",\n' +
    '    "category": "perfume",\n' +
    '    "price": 60000,\n' +
    '    "stock": 40\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 11,\n' +
    '    "name": "Daily Sunscreen",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/sunscreen.jpg",\n' +
    '    "description": "Protects your skin from harmful UV rays",\n' +
    '    "category": "skin care",\n' +
    '    "price": 35000,\n' +
    '    "stock": 65\n' +
    '  },\n' +
    '  {\n' +
    '    "id": 12,\n' +
    '    "name": "Charcoal Face Mask",\n' +
    '    "img": "https://res.cloudinary.com/dw57gwzru/image/upload/v1737063524/face_mask.jpg",\n' +
    '    "description": "Deep cleanses and refreshes your face",\n' +
    '    "category": "face",\n' +
    '    "price": 20000,\n' +
    '    "stock": 100\n' +
    '  }\n' +
    ']');

console.log(data)

let productsRow = document.getElementById("products");
let html = '';

for (var i=0; i<data.length; i++)
{
    html += '<div class="card p-0 me-3 bg-light shadow mt-3" id="' + data[i].id + '" data-category=" ' + data[i].category + ' " data-stock=" ' + data[i].stock + ' ">\n' +
        '                <img class="card-img-top h-75" src=" ' + data[i].img + ' ">\n' +
        '                <div class="card-body">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-6 justify-content-start">\n' +
        '                            <h4 class="fs-5 fw-bold lh-lg align-text-bottom"> ' + data[i].name + '</h4>\n' +
        '                        </div>\n' +
        '                        <div class="col-6 align-middle justify-content-end text-end">\n' +
        '                            <p class="card-text align-text-bottom lh-lg fw-bold">\n' +
        '                                $ ' + data[i].price + ' \n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <p class="card-text text-justify">\n' +
        '                       ' +  data[i].description + '  ' +
        '                    </p>\n' +
        '                    <button class="btn add-to-cart-button ">Add to cart</button>\n' +
        '                </div>\n' +
        '            </div>';

}

productsRow.innerHTML = html;