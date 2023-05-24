
function displayRestaurants(restaurants) {
    // Clear any previous search results
    const popularRestaurantsSection = document.querySelector('section.popular-restaurants');
    popularRestaurantsSection.innerHTML = '';

    // Update the number of search results
    const numberOfResults = document.querySelector('h3.number-of-results');
    numberOfResults.textContent = restaurants.length + ' Results';

    // Create a new card for each restaurant
    restaurants.forEach(function (restaurant) {

        // Create a new div with the class 'restaurant-card'
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');


        const handleImageClick = () => {
            window.location.href = `/restaurantMenuPage/${restaurant.restaurantID}`;
        };

        const restaurantImage = document.createElement('img');
        restaurantImage.src = restaurant.image_url;
        restaurantImage.classList.add('clickable');
        restaurantCard.appendChild(restaurantImage);

        restaurantImage.addEventListener('click', handleImageClick);



        // Add the restaurant name
        const restaurantName = document.createElement('h2');
        restaurantName.textContent = restaurant.restaurant_Name;
        restaurantCard.appendChild(restaurantName);

        // Add the delivery information
        const deliveryInfo = document.createElement('span');
        deliveryInfo.textContent = ` 3.5 mi `;
        deliveryInfo.classList.add('delivery-info');
        restaurantCard.appendChild(deliveryInfo);


        // Add the delivery fee
        const deliveryFee = document.createElement('span');
        deliveryFee.textContent = `${restaurant.delivery_time} `;
        deliveryFee.classList.add('delivery-fee');
        deliveryInfo.appendChild(deliveryFee);
        // Add the restaurant rating'


        const restaurantRating = document.createElement('span');
        deliveryFee.classList.add('star');
        restaurantRating.innerHTML = `4.5 <i class="fas fa-star">  </i>`;
        restaurantCard.appendChild(restaurantRating);

        const heartIcon = document.createElement('span');
        heartIcon.classList.add('heart-icon', 'far', 'fa-heart');
        restaurantCard.insertBefore(heartIcon, restaurantImage);


        heartIcon.addEventListener('click', function () {
            // Send a POST request to the server to toggle the favorite status
            fetch('/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        restaurant_id: restaurant.restaurantID
                    }),
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    if (response.success) {

                        // Update the heart icon based on the server's response
                        if (response.action === 'added') {
                            heartIcon.classList.remove('far', 'heart-outline');
                            heartIcon.classList.add('fas', 'heart-red');
                        } else {
                            heartIcon.classList.remove('fas', 'heart-red');
                            heartIcon.classList.add('far', 'heart-outline');
                        }
                    } else {
                        console.log('Error updating favorites:', response.message);
                    }
                });
        });



        popularRestaurantsSection.appendChild(restaurantCard);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const searchTerm = document.getElementById('search-input').value;
    const cuisineType = document.getElementById('category-select').value;
    let url;

    if (searchTerm === '' && cuisineType != '') {
        console.log('should serach by cuisineType')
        url = '/getCuisineType?searchTerm=' + cuisineType
        console.log('url', url);
    } else {
        url = '/getRestaurants?searchTerm=' + searchTerm

    }

    //console.log('searchTerm', searchTerm);
    //console.log('cuisineType', cuisineType);
    //console.log("attempting to fetch from url: ", url);

    try {
        const response = await fetch(url).then(function (response) {
            return response.json();
        });

        let specificRestaurants = response;

        fetch('/getAllRestaurants')
            .then(function (response) {
                return response.json();
            })
            .then(function (allRestaurants) {
                // Call the displayRestaurants() function with all the 

                let newRestaurants = [];

                for (let i = 0; i < specificRestaurants.length; i++) {
                    for (let j = 0; j < allRestaurants.length; j++) {
                        if (specificRestaurants[i].restaurantID === allRestaurants[j].restaurantID) {
                            newRestaurants.push(allRestaurants[j]);
                        }
                    }
                    if (window.location.pathname === '/') {
                        displayRestaurants(newRestaurants);
                    }

                }
            });


    } catch (error) {
        console.error(`Error fetching search results: ${error.message}`);
    }
}




async function fetchRestaurants() {
    const response = await fetch('/getAllRestaurants');

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error fetching restaurants: ${response.statusText}`);
    }
}

/**
 * Add an event listener to the search form to call the handleFormSubmit function
 * when the form is submitted
 */
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("form.search-form");
    searchForm.addEventListener("submit", handleFormSubmit);
});