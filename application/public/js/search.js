
document.addEventListener('DOMContentLoaded', function() {
    // Get the search form element
    const form = document.querySelector('form.search-form');

    // Add an event listener for form submissions
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the selected category and search input values
        const categorySelect = document.getElementById('category-select');
        const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
        const searchInput = document.querySelector('input.search-input').value;

        // If a category is selected, fetch restaurants by cuisine type
        if (selectedCategory !== '') {
            fetch('restaurants/getCuisineType?searchTerm=' + encodeURIComponent(selectedCategory))
                .then(function(response) {
                    return response.json();
                })
                .then(function(restaurantsByCuisineType) {
                    // Call the displayRestaurants() function with the filtered restaurants
                    displayRestaurants(restaurantsByCuisineType);
                });
        }
        // If a search term is entered, fetch restaurants by name
        else if (searchInput !== '') {
            fetch('restaurants/getRestaurants?searchTerm=' + encodeURIComponent(searchInput))
                .then(function(response) {
                    return response.json();
                })
                .then(function(restaurantsByName) {
                    // Call the displayRestaurants() function with the filtered restaurants
                    displayRestaurants(restaurantsByName);
                });
        }
        // If no category or search term is specified, fetch all restaurants
        else {
            fetch('/restaurants/getAllRestaurants')
                .then(function(response) {
                    return response.json();
                })
                .then(function(allRestaurants) {
                    // Call the displayRestaurants() function with all the restaurants
                    displayRestaurants(allRestaurants);
                });
        }
    });

    // Fetch all restaurants when the page loads
    fetch('/getAllRestaurants')
        .then(function(response) {
            return response.json();
        })
        .then(function(allRestaurants) {
            // Call the displayRestaurants() function with all the restaurants
            displayRestaurants(allRestaurants);
        });

    // Function to display the restaurants on the page
    function displayRestaurants(restaurants) {
        // Clear any previous search results
        const popularRestaurantsSection = document.querySelector('section.popular-restaurants');
        popularRestaurantsSection.innerHTML = '';

        // Update the number of search results
        const numberOfResults = document.querySelector('h3.number-of-results');
        numberOfResults.textContent = restaurants.length + ' Results';

        // Create a new card for each restaurant
        restaurants.forEach(function(restaurant) {
            // Create a new div with the class 'restaurant-card'
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('restaurant-card');

            // Add the restaurant name
            const restaurantName = document.createElement('h2');
            restaurantName.textContent = restaurant.restaurant_Name;
            restaurantCard.appendChild(restaurantName);

            // Add the restaurant image
            const restaurantImage = document.createElement('img');
            restaurantImage.src = restaurant.image;
            restaurantCard.appendChild(restaurantImage);

            // Add the restaurant rating
            const restaurantRating = document.createElement('p');
            restaurantRating.textContent = 'Rating: ' + 'TBD';
            restaurantCard.appendChild(restaurantRating);

            // Add the 'View Menu' button
            const viewMenuButton = document.createElement('a');
            viewMenuButton.href = '/menu/' + restaurant.id;
            viewMenuButton.textContent = 'View Menu';
            viewMenuButton.classList.add('button');
            restaurantCard.appendChild(viewMenuButton);

            // Add the restaurant card to the popular restaurants
            // section
            popularRestaurantsSection.appendChild(restaurantCard);
        });
    }
});

// // Google Maps API code for initialization
// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 14
//     });
//
//     var request = {
//         location: { lat: 37.7749, lng: -122.4194 },
//         radius: '500',
//         query: 'restaurants'
//     };
//
//     var service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, callback);
//
//     function callback(results, status) {
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//                 createMarker(results[i]);
//             }
//         }
//     }
//
//     function createMarker(place) {
//         var marker = new google.maps.Marker({
//             map: map,
//             position: place.geometry.location
//         });
//     }
// }