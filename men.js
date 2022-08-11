let carts = document.querySelectorAll('.add-cart');

let products = [
{
    name: 'Pendora',
    tag: 'pendora',
    price: 7000,
    inCart: 0
},
{
    name: 'Scarlet',
    tag: 'scarlet',
    price: 8000,
    inCart: 0
},
{
    name: 'Smart Collection',
    tag: 'smart',
    price: 2000,
    inCart: 0
},
{
    name: 'Maison',
    tag: 'maison',
    price: 3000,
    inCart: 0
},
{
    name: 'Parish Body Spray',
    tag: 'paris-b',
    price: 1000,
    inCart: 0
},
{
    name: 'Pure Love',
    tag: 'pure',
    price: 1500,
    inCart: 0
},
{
    name: 'Bakkarat',
    tag: 'bakkarat',
    price: 9000,
    inCart: 0
},
{
    name: 'Riggs London_Python',
    tag: 'riggs_p',
    price: 2000,
    inCart: 0
},
{
    name: 'The Chairman',
    tag: 'chairman',
    price: 5000,
    inCart: 0
},
{
    name: 'Body Mist',
    tag: 'body_mist',
    price: 1000,
    inCart: 0
},
{
    name: 'Body Philosophy',
    tag: 'body_philo',
    price: 2000,
    inCart: 0
},
{
    name: 'Body luxery',
    tag: 'body_Lux',
    price: 2000,
    inCart: 0
},
{
    name: 'Suave',
    tag: 'suave',
    price: 3000,
    inCart: 0
},
{
    name: 'Wolf Trap',
    tag: 'wolf_trap',
    price: 2000,
    inCart: 0
},
{
    name: 'Strawberries',
    tag: 'straw',
    price: 1500,
    inCart: 0
},
{
    name: 'Just',
    tag: 'just',
    price: 5000,
    inCart: 0
},
{
    name: 'Smart Collection',
    tag: 'smart_c',
    price: 2000,
    inCart: 0
},
{
    name: 'The Chairman',
    tag: 'chair_a',
    price: 5000,
    inCart: 0
},
{
    name: 'Gift Awesome',
    tag: 'gift_a',
    price: 7000,
    inCart: 0
},
{
    name: 'Gift Wonderful',
    tag: 'gift_w',
    price: 8000,
    inCart: 0
},
{
    name: 'Chairman Gift',
    tag: 'chairman_gift',
    price: 20000,
    inCart: 0
},
{
    name: 'Bakkarat Gift Pack',
    tag: 'bakkarat_gift',
    price: 3000,
    inCart: 0
}
]
for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalcost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
    localStorage.setItems('cartNumbers',  1);
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1; 
    } else {
        localStorage.setItem('cartNumbers', 1
    );
    document.querySelector('.cart span').textContent = 1; 
    }
   setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
    }
    
    } 

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}




function totalcost(product) {
    //console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalcost');
    console.log("My cartCost is ", cartCost);

    if(cartCost != null) {
        cartCost =  parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price);
    } else {
        localStorage.setItem("totalcost", product.price)
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems =  JSON.parse(cartItems);
     let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem('totalcost');

     console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="trash-outline"></ion-icon>
                    <img src="/images/${item.tag}.jpg"><span>${item.name}</span>
                </div>
                <div class="price">${item.price}
            </div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
            ₦${item.inCart * item.price}: 00
            </div>
            `;
        }); 

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                </h4>
                <h4 class="basketTotal">
                ₦${cartCost}:00</h4> 
        </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();