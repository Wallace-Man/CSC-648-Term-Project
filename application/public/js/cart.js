/*
    JavaScript Code for Cart and Checkout Pages
    Author: [Your Name]
    Date: [Current Date]

    Description:
    This file contains the JavaScript code to render and interact with the cart page and checkout page.
    It utilizes local storage to store the cart items. The code provides functionality to add items to the cart,
    calculate the total price, and load the cart cards and order summary on the respective pages.

    List of Functions:
    1. createCartCard(itemName, itemPrice, quantity): Creates a cart card element for a specific item.
    2. addToCart(itemName, itemPrice, quantity): Adds an item to the cart with the specified name, price, and quantity.
    3. getCartItemCount(): Retrieves the total count of items in the cart.
    4. calculateTotal(): Calculates the total price of all items in the cart.
    5. setCart(cart): Updates the cart in the local storage with the provided cart data.
    6. setPromos(promos): Updates the promos in the local storage with the provided promo data.
    7. loadCartCards(): Loads and displays the cart cards from local storage on the cart page.
    8. loadOrderSummary(): Loads and displays the order summary from local storage on the checkout page.
*/

// Check if cart exists in local storage, create one if it doesn't
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('promos', JSON.stringify([]));
    console.log('Created cart in local storage...');
    console.log('Created promos in local storage...');
} else {
    console.log('Cart found in local storage... loaded');
    console.log(localStorage.getItem('cart'));
    const cart = JSON.parse(localStorage.getItem('cart'));
}

/**
 * Creates a cart card element for a specific item.
 * @param {string} itemName - The name of the item.
 * @param {number} itemPrice - The price of the item.
 * @param {number} quantity - The quantity of the item.
 * @returns {HTMLElement} The created cart card element.
 */
function createCartCard(itemName, itemPrice, quantity) {
    // create elements
    const cartCard = document.createElement('div');
    const cartCardImg = document.createElement('div');
    const img = document.createElement('img');
    const cartCardInfo = document.createElement('div');
    const title = document.createElement('h2');
    const price = document.createElement('p');
    const cartCardQuantity = document.createElement('div');
    const label = document.createElement('label');
    const select = document.createElement('select');

    // set attributes and text content
    cartCard.classList.add('cart-card');
    //cartCardImg.classList.add('cart-card-img');
    //img.setAttribute('src', 'https://via.placeholder.com/150');
    //img.setAttribute('alt', 'Fake Item Image');
    cartCardInfo.classList.add('cart-card-info');
    title.classList.add('cart-card-title');
    title.textContent = itemName;
    price.classList.add('cart-card-price');
    price.textContent = `$${itemPrice}`;
    cartCardQuantity.classList.add('cart-card-quantity');
    label.setAttribute('for', 'item-quantity');
    label.textContent = 'Quantity:';
    select.setAttribute('name', 'item-quantity');
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.textContent = i;
        select.appendChild(option);
    }
    select.value = quantity;

    // append elements
    cartCardImg.appendChild(img);
    cartCardInfo.appendChild(title);
    cartCardInfo.appendChild(price);
    cartCardQuantity.appendChild(label);
    cartCardQuantity.appendChild(select);
    cartCardInfo.appendChild(cartCardQuantity);
    cartCard.appendChild(cartCardImg);
    cartCard.appendChild(cartCardInfo);
    return cartCard;
}

export function addToCart(itemName, itemPrice, quantity) {
    // get cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // check if item already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.name === itemName);

    if (existingItemIndex !== -1) {
        // item already exists, update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // item does not exist, create new item object and add to cart
        const newItem = {
            name: itemName,
            price: itemPrice,
            quantity: quantity
        };
        cart.push(newItem);
    }

    // update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(calculateTotal());
}

/**
 * Retrieves the total count of items in the cart.
 * @returns {number} The total count of items in the cart.
 */
function getCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count += parseInt(cart[i].quantity);
    }
    return count;
}

/**
 * Calculates the total price of all items in the cart.
 * @returns {number} The total price of all items in the cart.
 */
export function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    console.log('calculated total' + total);
    return total.toFixed(2);
}

/**
 * Updates the cart in the local storage with the provided cart data.
 * @param {Array} cart - The updated cart data.
 */
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Updates the promos in the local storage with the provided promo data.
 * @param {Array} promos - The updated promo data.
 */
function setPromos(promos) {
    localStorage.setItem('promos', JSON.stringify(promos));
}

/**
 * Loads and displays the cart cards from local storage on the cart page.
 * If the cart is empty, displays a message.
 */
function loadCartCards() {
    console.log('Loading cart cards...');
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartContainer = document.getElementById('cart-cards');
    const cartFormContainer = document.getElementById('the-container');
    if (cart.length === 0) {
        cartFormContainer.innerHTML = '';
        cartFormContainer.append('Your cart is empty!');
    }
    for (let i = 0; i < cart.length; i++) {
        const cartCard = createCartCard(cart[i].name, cart[i].price, cart[i].quantity);
        cartContainer.appendChild(cartCard);
    }
}

/**
 * Loads and displays the order summary from local storage on the checkout page.
 * If the cart is empty, displays a message.
 */
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartContainer = document.getElementById('order-summary-card');
    const cartFormContainer = document.getElementById('the-container');

    console.log(cartContainer);
    if (cart.length === 0) {
        cartFormContainer.innerHTML = '';
        cartFormContainer.append('Your cart is empty!');
    }
    for (let i = 0; i < cart.length; i++) {
        const cartCard = createCartCard(cart[i].name, cart[i].price, cart[i].quantity);
        console.log(cartCard)
        cartCard.querySelector('select').remove();
        cartCard.querySelector('label').append(cart[i].quantity);
        cartContainer.appendChild(cartCard);

    }
}

// This function updates the cart subtotal and cart count displayed on the page
function updateCartSubtotal() {
    const subtotal = document.getElementById('subtotal-label');
    subtotal.innerHTML = '';
    subtotal.append('$' + calculateTotal());
    let cartCount = document.getElementById('cart-count');
    cartCount.innerHTML = '';
    cartCount.append(getCartItemCount() + ' items');
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/cart') {
        // Retrieve cart items from local storage
        let localCart = JSON.parse(localStorage.getItem('cart'));
        let cartContainer = document.getElementById('the-container');
        let subtotal = document.getElementById('subtotal-label');
        let cartCount = document.getElementById('cart-count');
        let restaurantJSON = JSON.parse(localStorage.getItem('restaurant'));

        let restImage = document.getElementById('restaurantImage');
        let restName = document.getElementById('restaurantName');
        restName.innerHTML = restaurantJSON.restaurant_Name;
        restImage.src = restaurantJSON.image_url;
        cartCount.innerHTML = '';
        cartCount.append(getCartItemCount() + ' items');
        subtotal.append('$' + calculateTotal());
        loadCartCards();

        const quantities = document.getElementsByTagName('select');
        console.log(quantities)
        // Add change event listener to each quantity select element
        for (let i = 1; i < quantities.length; i++) {
            const select = quantities[i];
            select.addEventListener('change', function (event) {
                // Get the selected quantity
                const selectedQuantity = event.target.value;
                const itemName = select.parentNode.parentNode.childNodes[0].textContent

                // Find the index of the item in the localCart array
                const existingItemIndex = localCart.findIndex((item) => item.name === itemName);

                // Update the quantity of the item in the localCart array
                localCart[existingItemIndex].quantity = selectedQuantity;
                console.log(localCart[existingItemIndex])

                // Update the cart in local storage and update the cart subtotal
                setCart(localCart);
                updateCartSubtotal();
            });

            let restaurantImage = document.getElementById('restaurantImage');
            console.log('restaurantImage', restaurantImage)
            // Add click event listener to the restaurant image
            restaurantImage.addEventListener('click', () => {
                let restaurantJSON = JSON.parse(localStorage.getItem('restaurant'));
                let restaurantID = restaurantJSON.restaurantID;
                // Redirect to the restaurant menu page
                window.location.href = '/restaurantMenuPage/' + restaurantID;
            });
        }

        let promoContainer = document.getElementById('active-promos');

        if (localStorage.getItem('promos').length != 0) {
            let promoStorage = JSON.parse(localStorage.getItem('promos'));
            let promotion = ('Active Promotion: ' + promoStorage);
            console.log('promoStorage', promoStorage);

            if (promoStorage === null || promoStorage === undefined || promoStorage === []) {
                promoContainer.append('No active promotions');
            } else {
                promoContainer.append(promotion);
            }
        } else {
            promoContainer.append('No active promotions');
        }
    }

    if (window.location.pathname === '/promotions') {
        // Get all the add promo buttons
        const addPromoButtons = document.querySelectorAll('.add-promo');
        console.log(addPromoButtons)
        // Add click event listener to each add promo button
        addPromoButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Change button text to "Added"
                button.innerHTML = 'Added';

                // Change button background color to green
                button.style.backgroundColor = 'green';
                button.parentElement.parentElement.style.backgroundColor = 'white';

                // Get the promo code from local storage
                let promoStorage = JSON.parse(localStorage.getItem('promos'));
                const percentagePattern = /\d+(?=%)/; // Matches one or more digits followed by a % sign

                // Get the promo percentage from the button text
                let promoString = button.parentNode.textContent;
                const percentageMatch = promoString.match(percentagePattern);
                if (percentageMatch) {
                    const percentage = parseFloat(percentageMatch[0]) / 100;
                    console.log('Setting Percentage (decimal):', percentage);
                    localStorage.setItem('promoDiscount', percentage);
                }

                // Get the promo title
                let promoTitle = button.parentNode.textContent.split(':')[0];
                setPromos(promoTitle);
            });
        });
    }

    if (window.location.pathname === '/checkout') {
        // Load the order summary
        loadOrderSummary();

        const subtotal = document.getElementById('subtotal-label');
        const tax = document.getElementById('tax-label');
        const total = document.getElementById('total-label');
        const promoDiscount = localStorage.getItem('promoDiscount');
        const promoContainer = document.getElementById('promo-discount-label');
        const discount = (calculateTotal() * promoDiscount).toFixed(2);
        promoContainer.append('-$' + discount);
        subtotal.append('$' + calculateTotal());
        tax.append('$' + (calculateTotal() * 0.0925).toFixed(2));
        let totalNumber = (calculateTotal() * 1.0925) - discount;
        console.log(totalNumber.toFixed(2))
        total.append('$' + totalNumber.toFixed(2));

        const placeOrderButton = document.createElement('button');
        placeOrderButton.innerText = 'Place Order';
        placeOrderButton.classList.add('place-order-button')
        placeOrderButton.addEventListener('click', () => {
            // Redirect to the order status page
            window.location.href = '/orderstatus';
        });
        const checkoutContainer = document.querySelector('#checkout-cards');
        checkoutContainer.appendChild(placeOrderButton);
    }

    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.addEventListener('click', () => {
        // Clear the cart in local storage and refresh the page
        localStorage.setItem('cart', JSON.stringify([]));
        location.reload();
    });
});
