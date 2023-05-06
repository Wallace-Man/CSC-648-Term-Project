import { addToCart, calculateTotal } from './cart.js';
// get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.restaurant-card button');

// initialize the cart items
let cartItems = [];

// listen for click events on the "Add to Cart" buttons
addToCartButtons.forEach((button) => {
button.addEventListener('click', (event) => {
    // get the card element
    const card = event.target.parentNode;

    // get the item name and price
    const itemName = card.querySelector('h3').textContent;
    let itemPrice = card.querySelector('.price').textContent;
    itemPrice = itemPrice.substring(1);

    // update the cart in local storage
    addToCart(itemName, itemPrice, 1);
    console.log('item added to cart', localStorage.getItem('cart'));

    // update the cart UI
    updateCart();

});
});

// update the cart UI
function updateCart() {

    // select the cart html elements
    const cartContainer = document.querySelector('#restaurant-cart');
    const cartz = document.querySelector('#restaurant-cart ul');

    // get the cart from local storage
    let localCart = JSON.parse(localStorage.getItem('cart'));

    // if the cart is empty, display empty message
    if(localCart.length == 0){
        let isEmpty = document.querySelector('p#cart-empty');
        isEmpty.innerHTML = 'Your cart is empty';
    }else{
        // console.log('updated cart called on not empty cart')
        // console.log('attempting to update cart ui')
        // clear the cart element
        cartz.innerHTML = '';
            // loop through the cart items
        for (let i = 0; i < localCart.length; i++) {
            const li = document.createElement('li')
            li.innerHTML = localCart[i].name + ' x ' + localCart[i].quantity
            cartz.appendChild(li);
        }   
    

        // calculate the total price
        let total = calculateTotal();

        // add the total to the cart UI
        const totalElement = document.createElement('li');
        const hrElement = document.createElement('hr');
        cartz.appendChild(hrElement);
        totalElement.innerHTML = `<span>Total</span><span>$${total}</span>`;
        cartz.appendChild(totalElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
  });