
// get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.card button');

// initialize the cart items
let cartItems = [];

// listen for click events on the "Add to Cart" buttons
addToCartButtons.forEach((button) => {
button.addEventListener('click', (event) => {
    // get the card element
    const card = event.target.parentNode;

    // get the item name and price
    const itemName = card.querySelector('h3').textContent;
    const itemPrice = card.querySelector('.price').textContent;

    // create the cart item object
    const cartItem = { name: itemName, price: itemPrice };

    // add the cart item to the cart items array
    cartItems.push(cartItem);

    // update the cart UI
    updateCart();
});
});

// update the cart UI
function updateCart() {
// get the cart element
const cart = document.querySelector('#cart ul');

// clear the cart element
cart.innerHTML = '';

// calculate the total price
let total = 0;

// loop through the cart items
cartItems.forEach((item) => {
    // create the cart item HTML
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><span>${item.price}</span>`;
    cart.appendChild(li);

    // add the item price to the total
    total += parseFloat(item.price.replace('$', ''));
});

// add the total to the cart UI
const totalElement = document.createElement('li');
const hrElement = document.createElement('hr');
cart.appendChild(hrElement);
totalElement.innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
cart.appendChild(totalElement);
}
