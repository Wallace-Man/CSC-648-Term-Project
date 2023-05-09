
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

  
   // Add the restaurant image
   const restaurantImage = document.createElement('img');
   restaurantImage.src = restaurant.image_url;
   restaurantImage.classList.add('clickable');
   restaurantCard.appendChild(restaurantImage);
    // Add the restaurant name
    const restaurantName = document.createElement('h2');
    restaurantName.textContent = restaurant.restaurant_Name;
    restaurantCard.appendChild(restaurantName);

   // Add the delivery information
   const deliveryInfo = document.createElement('span');
   deliveryInfo.innerHTML =`<br>`;
   deliveryInfo.textContent = ` 3.5 mi - ${restaurant.delivery_time} - $0 delivery fee`;
   restaurantCard.appendChild(deliveryInfo);
   // Add the restaurant rating
   const restaurantRating = document.createElement('span');
   restaurantRating.innerHTML = `<br>`;
   restaurantRating.innerHTML = `4.5 <i class="fas fa-star"></i>`;
   restaurantCard.appendChild(restaurantRating);
   
   const heartIcon = document.createElement('span');
   
   heartIcon.classList.add('heart-icon', 'far', 'fa-heart');
   restaurantCard.insertBefore(heartIcon, restaurantImage);
   
   // Add a click event listener to the heart icon
heartIcon.addEventListener('click', function() {
    // Perform an action when the heart icon is clicked
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far', 'heart-outline');
        heartIcon.classList.add('fas', 'heart-red');
    } else {
        heartIcon.classList.remove('fas', 'heart-red');
        heartIcon.classList.add('far', 'heart-outline');
    }
    console.log('Heart icon clicked!');
  });


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
/*

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

        // Add the restaurant image
        
            const restaurantImage = document.createElement('img');
            restaurantImage.src = restaurant.image_url;
            restaurantImage.classList.add('clickable');
            restaurantCard.appendChild(restaurantImage);

        // Add the favorite icon
            const favoriteButton = document.createElement('i');
            favoriteButton.classList.add('favorite', 'far', 'fa-heart');
            restaurantCard.appendChild(favoriteButton);


  
            favoriteButton.addEventListener('click', function() {
                 // Toggle the 'fas' and 'far' classes to change the icon's appearance
                 if (favoriteButton.classList.contains('far')) {
                     favoriteButton.classList.remove('far', 'heart-outline');
                     favoriteButton.classList.add('fas', 'heart-red');
                 } else {
                     favoriteButton.classList.remove('fas', 'heart-red');
                     favoriteButton.classList.add('far', 'heart-outline');
                 }
     
                 // TODO: Handle favorite icon click
                 console.log('Favorite clicked for restaurant ' + restaurant.restaurant_Name);
             })
   
            

    
            
            const restaurantInfo = document.createElement('div');
            restaurantInfo.classList.add('restaurant-info');

             // Add the restaurant name
            const restaurantName = document.createElement('h2');
            restaurantName.textContent = restaurant.restaurant_Name;
            restaurantInfo.appendChild(restaurantName);
            
            //Add the 'Delivery Time' text display
            const deliveryInfo = document.createElement('span');
            deliveryInfo.textContent = `${restaurant.delivery_time} . ${restaurant.delivery_fee} . ${restaurant.delivery_distance}`;
            restaurantInfo.appendChild(deliveryInfo);
            
            const deliveryFee = document.createElement('p');
            deliveryFee.classList.add('delivery-fee')
            deliveryFee.textContent =  "$3.00";
            restaurantInfo.appendChild(deliveryFee);

            
            // Add the restaurant rating
            const restaurantRating = document.createElement('p');
            restaurantRating.classList.add('rating')
            restaurantRating.innerHTML = '<i class="fas fa-star"></i> 4.5 ';
            restaurantInfo.appendChild(restaurantRating);
            
            restaurantCard.appendChild(restaurantInfo);
 
    
            // Add the restaurant card to the popular restaurants
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

*/