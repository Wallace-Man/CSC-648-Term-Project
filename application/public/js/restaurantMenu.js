/*
    This file contains the JavaScript code to render and interact with the restaurant menu page. 
    It is implemented using local storage to store the cart items.
*/

import {
    addToCart,
    calculateTotal
} from './cart.js';
// get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.menu-card button');

// initialize the cart items
let cartItems = [];

// listen for click events on the "Add to Cart" buttons
addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // get the card element
        const card = button.closest('.menu-card');

        // get the item name and price
        const itemName = card.querySelector('h2').textContent;
        let itemPrice = card.querySelector('.price').textContent;
        // itemPrice = itemPrice.substring(1);

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
    if (localCart.length == 0) {
        let isEmpty = document.querySelector('p#cart-empty');
        isEmpty.innerHTML = 'Your cart is empty';
    } else {
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

    fetch('/getAllRestaurants').then(function (response) {
        return response.json();
    }).then(function (allRestaurants) {
        const urlParams = window.location.href;
        const restaurantID = urlParams.slice(-1);
        const restaurant = allRestaurants.find(restaurant => restaurant.restaurantID == restaurantID);
        localStorage.setItem('restaurant', JSON.stringify(restaurant));
        const restaurantJSON = JSON.parse(localStorage.getItem('restaurant'));

        const menuName = document.getElementById('MenuName');
        const restaurantImage = document.getElementById('restaurantImage');

        menuName.innerHTML = restaurantJSON.restaurant_Name;
        restaurantImage.src = restaurantJSON.image_url;
    });
});