/** 
* This file contains the JavaScript code to render and interact with the menu creation page. 
* 
* The main functionality of the application includes: 
*   - When the page is rendered, add buttons that add item cards where the owner can edit to make menu items
*   - When the user submits the form, it will go the next page which is the confirmation page
*   - TODO: Get all the menu items and post them to the DB
*
*   Author: Wallace Man
*/

// For when the window fully loads, add the event listener
window.addEventListener("DOMContentLoaded", (event) => {
    const listOfItems = document.getElementById("items");
    const addItemBtn = document.getElementById("add-item-btn");
    const form = document.getElementById("restaurant-info-form");
    if(form){
        // Collects the element's value from the fields
        form.addEventListener("submit", () => {
            event.preventDefault();
            /*TO DO */
            /* GET ELEMENTS FROM ALL THE MENU ITEMS */

            window.location.href='/confirmation';   // Require changing
        });
    }
    if(addItemBtn){
        // Adding a new menu item card to the list
        addItemBtn.addEventListener("click", function() {
            const newItem = document.createElement('div');
            newItem.classList.add("item");
            const newMarkup = `
                <label id="item_label" for="item-name">Name of Menu Item:</label>
                <input type="text" id="item-name" name="item-name" required>
                <label id="item_label" for="item-price">Price of Menu Item:</label>
                <input type="text" id="item-price" name="item-price" placeholder="123.45" required>
                <label id="item_label" for="item-category">Menu Item Category</label>
                <select id="item-category">
                    <option disabled selected>-- Select An Option --</option>
                    <option value="option1">Entree</option>
                    <option value="option2">Side</option>
                    <option value="option3">Drink</option>
                    <option value="option3">Combo</option>
                </select>
                <label id="item_label" for="item-description">Description:</label>
                <textarea id="description" name="description" rows="4" cols="50" placeholder="Description of Menu Item" required></textarea>
                <button type="button" class="delete-item-btn">Delete</button>
                `;
            newItem.innerHTML = newMarkup;
            // Appending the newly created item html div to the list
            listOfItems.appendChild(newItem);
            // Creating a button to delete self from list
            const deleteBtn = newItem.querySelector(".delete-item-btn");
            deleteBtn.addEventListener("click", function(){
                listOfItems.removeChild(newItem);
            });
        });
    }
});
