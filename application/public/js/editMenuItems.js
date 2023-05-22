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
    const updatedItems = [];
    const deletedItems = [];
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
      const itemId = item.querySelector('#item-id').value;
      const name = item.querySelector('#item-name').value;
      const price = item.querySelector('#item-price').value;
      const category = item.querySelector('#item-category').value;
      const description = item.querySelector('#description').value;
      const deleted = item.querySelector('#item-deleted').value === 'true';

      const menuItem = { itemId, name, price, category, description };

      if (deleted) {
        deletedItems.push(menuItem);
      } else if (itemId === null) {
        newItems.push(menuItem);
      } else {
        updatedItems.push(menuItem);
      }
    });

    // Post new items
    for (const item of newItems) {
      try {
        const response = await fetch('/addMenuItem', {
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

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Post updated items
    for (const item of updatedItems) {
      try {
        const response = await fetch('/updateMenuItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemID: item.itemId,
            itemName: item.name,
            itemDescription: item.description,
            itemPrice: item.price
          })
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Post deleted items
    for (const item of deletedItems) {
      try {
        const response = await fetch('/deleteMenuItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemID: item.itemId,
          })
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    form.submit();
  });

  if (addItemBtn) {
    // Adding a new menu item card to the list
    addItemBtn.addEventListener("click", function () {
      const newItem = document.createElement('div');
      newItem.classList.add("item");
      const newMarkup = `
        <div class="item-details">
          <label for="item-id">ID</label>
          <input type="number" id="item-id" name="item-id" placeholder="Item ID" readonly>
          <label for="item-name">Name</label>
          <input type="text" id="item-name" name="item-name" placeholder="Item Name" required>
          <label for="item-price">Price</label>
          <input type="number" id="item-price" name="item-price" placeholder="Item Price" required>
          <label for="item-category">Category</label>
          <input type="text" id="item-category" name="item-category" placeholder="Item Category" required>
          <label for="description">Description</label>
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

    // Populate menu items from database
    for (const menuItem of data.menuItems) {
      const itemElement = document.createElement('div');
      itemElement.classList.add("item");
      itemElement.innerHTML = `
        <div class="item-details">
          <label for="item-id">ID</label>
          <input type="number" id="item-id" name="item-id" value="${menuItem.itemID}" placeholder="Item ID" readonly>
          <label for="item-name">Name</label>
          <input type="text" id="item-name" name="item-name" value="${menuItem.itemName}" placeholder="Item Name" required>
          <label for="item-price">Price</label>
          <input type="number" id="item-price" name="item-price" value="${menuItem.itemPrice}" placeholder="Item Price" required>
          <label for="item-description">Description</label>
          <input type="text" id="item-description" name="item-description" value="${menuItem.itemDescription}" placeholder="Item Description" required>
          <input type="hidden" id="item-deleted" name="item-deleted" value="false">
        </div>
        <div class="item-actions">
          <button type="button" class="delete-item-btn">Delete</button>
        </div>
      `;
      listOfItems.appendChild(itemElement);
    }

    // Add event listeners to delete buttons
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        const itemElement = event.target.closest('.item');
        const deletedInput = itemElement.querySelector('#item-deleted');
        deletedInput.value = 'true';
        itemElement.style.display = 'none';
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
