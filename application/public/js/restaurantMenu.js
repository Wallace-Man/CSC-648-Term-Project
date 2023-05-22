/*
    This file contains the JavaScript code to render and interact with the restaurant menu page. 
    It is implemented using local storage to store the cart items.
*/

//Define the restaurant data as separate arrays (temporary)
// const restaurantInfo = {
//     name: "Roma Antica",
//     rating: 4.5,
//     category: "Italian",
//     address: "123 Main St, Anytown USA",
//     website: "www.restaurantname.com",
//     phone: "(123) 456-7890",
// };
  
// const menuItems = [
//     {
//       name: "Spaghetti Bolognese",
//       description: "Delicious spaghetti with a classic Bolognese sauce.",
//       price: 12
//     },
//     {
//       name: "Margherita Pizza",
//       description: "Fresh mozzarella, basil, and tomato sauce on a thin crust.",
//       price: 10
//     },
//     {
//       name: "Chicken Alfredo",
//       description: "Creamy fettuccine pasta with grilled chicken and parmesan cheese.",
//       price: 14
//     },
//     {
//       name: "Veggie Burger",
//       description: "A delicious vegetarian burger made with a soy patty, avocado, and chipotle mayo.",
//       price: 9
//     },
//     {
//       name: "Fish and Chips",
//       description: "Golden-brown battered fish served with crispy French fries and tartar sauce.",
//       price: 13
//     }
// ];


// Generate the HTML code dynamically for restaurant info
// const restaurantInfoHTML = `
//     <div id="restaurant-info">
//         <h3>${restaurantInfo.name}</h3>
//         <p>Rating: ${restaurantInfo.rating} stars</p>
//         <p>Category: ${restaurantInfo.category}</p>
//         <p>Address: ${restaurantInfo.address}</p>
//         <p>Website: ${restaurantInfo.website}</p>
//         <p>Phone: ${restaurantInfo.phone}</p>
//     </div>
//     <img src="https://via.placeholder.com/150">
// `;
  
// Generate the HTML code dynamically for menu items
// const menuItemsHTML = menuItems.map(item => `
//     <div class="restaurant-card">
//         <h3>${item.name}</h3>
//         <p>${item.description}</p>
//         <p class="price">$${item.price}</p>
//         <button>Add to cart</button>
//     </div>
// `).join("");

// // Insert the dynamically generated HTML code into the DOM
// const restaurantMain = document.getElementById("restaurant-main");
// restaurantMain.innerHTML = `
//     <div id="restaurant-header">
//         ${restaurantInfoHTML}
//     </div>
//     <div id="restaurant-menu-container">
//         <div id="restaurant-menu">
//             ${menuItemsHTML}
//         </div>
//     </div>
// `;  
  
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
    // fetch('/returnMenu')
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(allRestaurants) {
    //         displayRestaurants(allRestaurants);
    // });
});