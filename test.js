// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function() {

  // Get the form element
  var form = document.querySelector('form.search-form');

  // Add an event listener for form submissions
  form.addEventListener('submit', function(event) {

    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the selected category
    var categorySelect = document.getElementById('category-select');
    var selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;

    // Fetch restaurant data from the server
    fetch('/restaurants?category=' + selectedCategory)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Display the restaurant data on the page
        displayRestaurants(data);
      })
      .catch(function(error) {
        console.error('Error fetching restaurant data:', error);
      });

  });

  // Display restaurant data on the page
  function displayRestaurants(restaurants) {
    // TODO: Implement this function to display the restaurant data on the page
  }

});
