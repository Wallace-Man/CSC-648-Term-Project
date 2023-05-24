const { search } = require("../../routes");

document.addEventListener('DOMContentLoaded', function() {
    // Get the search form element
    // const form = document.querySelector('form.search-form');

    // // Add an event listener for form submissions
    // form.addEventListener('submit', async function(event) {
    //     // Prevent the default form submission behavior
    //     event.preventDefault();

        // Get the selected category and search input values
        // const categorySelect = document.getElementById('category-select');
        // const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
        // const searchInput = document.querySelector('input.search-input').value;
        
    //     console.log("selectedCategory: " + selectedCategory)
    //     console.log("searchInput: " + searchInput)
    //     url = encodeURIComponent( 'restaurants/getRestaurants?searchTerm=panda')
    //     console.log("url: " + url)
    //     const response = await fetch(url);
    //     console.log("response data: " + response)
    //     const data = await response.json();
    //     console.log("data: " + data)
    // });
        // if(selectedCategory == '' && searchInput != '') {

        //     fetch('/getRestaurants?searchTerm=' + searchInput)
        //     .then(function(response) {
        //         console.log("searching:")
        //         console.log(response)
        //         let restaurantData = response.json()
        //         console.log(restaurantData)
        //         return response.json();
        //     })
        //     .then(function(restaurantsByName) {
        //         // Call the displayRestaurants() function with the filtered restaurants
        //         displayRestaurants(restaurantsByName);
        //     });
        // }});
            
    //     // If a category is selected, fetch restaurants by cuisine type
    //     if (selectedCategory !== '' ) {
    //         fetch('restaurants/getCuisineType?searchTerm=' + encodeURIComponent(selectedCategory))
    //             .then(function(response) {
    //                 console.log("category respsonse:")
    //                 return response.json();
    //             })
    //             .then(function(restaurantsByCuisineType) {
    //                 // Call the displayRestaurants() function with the filtered restaurants
    //                 displayRestaurants(restaurantsByCuisineType);
    //             });
    //     }
    //     // If a search term is entered, fetch restaurants by name
    //     else if (searchInput !== '') {
    //         fetch('restaurants/getRestaurants?searchTerm=' + encodeURIComponent(searchInput))
    //             .then(function(response) {
    //                 console.log("search response with empty searchInput:")
    //                 console.log(response)

    //                 return response.json();
    //             })
    //             .then(function(restaurantsByName) {
    //                 // Call the displayRestaurants() function with the filtered restaurants
    //                 displayRestaurants(restaurantsByName);
    //             });
    //     }
    //     // If no category or search term is specified, fetch all restaurants
    //     else {
    //         fetch('/restaurants/getAllRestaurants')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(allRestaurants) {
    //                 // Call the displayRestaurants() function with all the restaurants
    //                 displayRestaurants(allRestaurants);
    //             });
    //     }
    // });

    if(window.location.pathname != '/favorites') {
    // Fetch all restaurants when the page loads
    // fetch('/getAllRestaurants')
    //     .then(function(response) {
    //         console.log("search response with empty searchInput:")
    //         return response.json();
    //     })
    //     .then(function(allRestaurants) {
    //         // Call the displayRestaurants() function with all the 
            

    
    //         displayRestaurants(allRestaurants);
    //     });
    }

    // Function to display the restaurants on the page
//     function displayRestaurants(restaurants) {
//         // Clear any previous search results
//         const popularRestaurantsSection = document.querySelector('section.popular-restaurants');
//         popularRestaurantsSection.innerHTML = '';

//         // Update the number of search results
//         const numberOfResults = document.querySelector('h3.number-of-results');
//         numberOfResults.textContent = restaurants.length + ' Results';

//         // Create a new card for each restaurant
//         restaurants.forEach(function(restaurant) {
    
//    // Create a new div with the class 'restaurant-card'
//    const restaurantCard = document.createElement('div');
//    restaurantCard.classList.add('restaurant-card');

  
//    const handleImageClick = () => {
//     window.location.href = `/restaurantMenuPage/${restaurant.restaurantID}`;
// };
  
// const restaurantImage = document.createElement('img');
// restaurantImage.src = restaurant.image_url;
// restaurantImage.classList.add('clickable');
// restaurantCard.appendChild(restaurantImage);
  
// restaurantImage.addEventListener('click', handleImageClick);

  
    
//    // Add the restaurant name
//    const restaurantName = document.createElement('h2');
//    restaurantName.textContent = restaurant.restaurant_Name;
//    restaurantCard.appendChild(restaurantName);

//   // Add the delivery information
//   const deliveryInfo = document.createElement('span');
//   deliveryInfo.textContent = ` 3.5 mi `;
//   deliveryInfo.classList.add('delivery-info');
//   restaurantCard.appendChild(deliveryInfo);

  
//   // Add the delivery fee
//    const deliveryFee = document.createElement('span');
//    deliveryFee.textContent = `${restaurant.delivery_time} `;
//    deliveryFee.classList.add('delivery-fee');
//    deliveryInfo.appendChild(deliveryFee);
//    // Add the restaurant rating'


//    const restaurantRating = document.createElement('span');
//    deliveryFee.classList.add('star');
//    restaurantRating.innerHTML = `4.5 <i class="fas fa-star">  </i>`;
//    restaurantCard.appendChild(restaurantRating);
   
//    const heartIcon = document.createElement('span');
//    heartIcon.classList.add('heart-icon', 'far', 'fa-heart');
//    restaurantCard.insertBefore(heartIcon, restaurantImage);
   
// //    // Add a click event listener to the heart icon
// //     heartIcon.addEventListener('click', function() {
// //     // Perform an action when the heart icon is clicked
// //     if (heartIcon.classList.contains('far')) {
// //         heartIcon.classList.remove('far', 'heart-outline');
// //         heartIcon.classList.add('fas', 'heart-red');
// //     } else {
// //         heartIcon.classList.remove('fas', 'heart-red');
// //         heartIcon.classList.add('far', 'heart-outline');
// //     }
// //       console.log('Heart icon clicked!');
// //   });
// heartIcon.addEventListener('click', function() {
//     // Send a POST request to the server to toggle the favorite status
//     console.log('Heart icon was clicked!');
//     fetch('/favorites', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ restaurant_id: restaurant.restaurantID }),
//     })
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(response) {
//       if (response.success) {
//         console.log('Restaurant', restaurant.restaurantID, 'has been', response.action, 'from favorites');
  
//         // Update the heart icon based on the server's response
//         if (response.action === 'added') {
//           heartIcon.classList.remove('far', 'heart-outline');
//           heartIcon.classList.add('fas', 'heart-red');
//         } else {
//           heartIcon.classList.remove('fas', 'heart-red');
//           heartIcon.classList.add('far', 'heart-outline');
//         }
//       } else {
//         console.log('Error updating favorites:', response.message);
//       }
//     });
// });

  

//             popularRestaurantsSection.appendChild(restaurantCard);
//         });
  //  }
});