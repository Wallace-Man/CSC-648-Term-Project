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

const restaurantID = window.restaurantID;
window.addEventListener("DOMContentLoaded", async (event) => {
  const listOfItems = document.getElementById("items");
  const addItemBtn = document.getElementById("add-item-btn");
  const form = document.getElementById("restaurant-info-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newItems = [];
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
      const name = item.querySelector('#item-name').value;
      const price = item.querySelector('#item-price').value;
      const description = item.querySelector('#description').value;

      const menuItem = { name, price, description };
      newItems.push(menuItem);
    });

    // Post new items
    for (const item of newItems) {
      try {
        const response = await fetch(`/addMenuItem/${restaurantID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemName: item.name,
            itemDescription: item.description,
            itemPrice: item.price
          })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // You may want to reload the page here to refresh the form and item list
    window.location.reload();
  });

  if (addItemBtn) {
    // Adding a new menu item card to the list
    addItemBtn.addEventListener("click", function () {
      const newItem = document.createElement('div');
      newItem.classList.add("item");
      const newMarkup = `
        <div class="item-details">
          <label for="item-name">Name</label>
          <input type="text" id="item-name" name="item-name" placeholder="Item Name" required>
          <label for="item-price">Price</label>
          <input type="number" id="item-price" name="item-price" placeholder="Item Price" required>
          <label for="item-category">Description</label>
          <input type="text" id="description" name="description" placeholder="Item Description" required>
          <input type="hidden" id="item-deleted" name="item-deleted" value="false">
        </div>
        <div class="item-actions">
          <button type="button" class="delete-item-btn">Delete</button>
        </div>
      `;
      newItem.innerHTML = newMarkup;
      listOfItems.appendChild(newItem);
    });

    listOfItems.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-item-btn")) {
        const itemElement = event.target.closest('.item');
        itemElement.remove();
      }
    });
  }

  // Get menu items from database
  try {
    const response = await fetch(`/returnMenu?restaurantID=${restaurantID}`);
    const data = await response.json();
    const menuItems = data.data;
    menuItems.forEach(item => {
      // Create a new item element and add it to the list
      const newItem = document.createElement('div');
      newItem.classList.add("item");
      const newMarkup = `
        <div class="item-details">
          <label for="item-name">Name</label>
          <input type="text" id="item-name" name="item-name" placeholder="Item Name" value="${item.name}" required>
          <label for="item-price">Price</label>
          <input type="number" id="item-price" name="item-price" placeholder="Item Price" value="${item.price}" required>
          <label for="item-category">Description</label>
          <input type="text" id="description" name="description" placeholder="Item Description" value="${item.description}" required>
          <input type="hidden" id="item-deleted" name="item-deleted" value="false">
        </div>
        <div class="item-actions">
          <button type="button" class="delete-item-btn">Delete</button>
        </div>
      `;
      newItem.innerHTML = newMarkup;
      listOfItems.appendChild(newItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
