/**
 * This file contains the JavaScript code to render and interact with a Google Maps-based
 * restaurant locator web application.
 *
 * The main functionality of the application includes:
 *   - Using the Google Maps API to display a map centered on the user's location
 *   - Allowing the user to search for nearby restaurants by keyword and category
 *   - Placing markers on the map to indicate the locations of nearby restaurants
 *   - Displaying an info window with additional information about each restaurant when a marker is clicked
 *
 * The script uses the following APIs and libraries:
 *   - Google Maps JavaScript API
 *   - Google Maps Places API
 *   - Google Maps Autocomplete API
 *   - Font Awesome Icons
 *
 * The script is organized into the following functions:
 *   - initMap: Initializes the Google Maps API and sets up the autocomplete search feature
 *   - handleLocationError: Displays an error message if the user's location cannot be determined
 *   - onPlaceChanged: Handles the event when the user selects a place from the autocomplete dropdown
 *   - handleFormSubmit: Handles the event when the user submits the search form
 *   - createMarker: Creates a marker on the map and adds an info window with information about the associated
 *     restaurant
 *   - getDistance: Calculates the distance between two points on the map using the Haversine formula
 *   - searchNearbyRestaurants: Searches for nearby restaurants using the Google Maps Places API
 */

// Initialize global variables
let infoWindow; // Info window object to display information about markers
let map; // Map object to display the map
let markers = []; // Array to hold marker objects
let service; // PlacesService object to interact with the Places API
let autocompleteService; // AutocompleteService object to provide suggestions as user types
let predictionsDropdown; // Dropdown element to display autocomplete predictions
let userLocation; // Object to store the user's location coordinates

/**
 * Initializes the Google Map, sets up the Autocomplete feature and location services, and adds a listener for place
 * selection.
 * Called when the Google Maps API script is loaded and the page is loaded.
 */
function initMap() {
    // Create a new InfoWindow object to display information when a marker is clicked
    infoWindow = new google.maps.InfoWindow();

    // If the user's location can be obtained, initialize the map and location services
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Store the user's location coordinates in a LatLng object
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Create a new Google Maps object centered on the user's location
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: userLocation
            });

            // Create a new PlacesService object to interact with the Google Places API
            service = new google.maps.places.PlacesService(map);

            // // Initialize the Autocomplete feature to provide place suggestions as the user types
            // const input = document.getElementById("search-input");
            // autocomplete = new google.maps.places.Autocomplete(input);
            // autocomplete.bindTo("bounds", map);
            //
            // // Add a listener for when the user selects a place from the Autocomplete dropdown
            // autocomplete.addListener("place_changed", onPlaceChanged);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    // If the user's location cannot be obtained, display an error message
    else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

/**
 * Called when the user selects a place from the autocomplete dropdown or presses the Enter key.
 * If the user hasn't selected a place, calls searchNearbyRestaurants() to search for nearby restaurants.
 * If the user has selected a place, centers the map on the selected place and adds a marker to it.
 */
function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (!place.geometry ) {
        // User has not selected any place, search nearby restaurants
        searchNearbyRestaurants();
    } else {
        // User has selected a place, show it on the map
        map.setCenter(place.geometry.location);
        map.setZoom(14);
        createMarker(place, map);
    }
}

/**
 * Search for nearby restaurants based on the current center of the map
 */
function searchNearbyRestaurants() {
    // Define the search request object with the current center of the map, a 1500 meter radius, and a type of "restaurant"
    const request = {
        location: map.getCenter(),
        radius: "1500",
        type: ["restaurant"],
    };

    // Use the PlacesService to execute the search request and handle the results
    service.nearbySearch(request, function (results, status) {
        // Check if the search request was successful
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Create a marker for each restaurant result and add it to the array of markers
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i], map);
            }
        }
    });
}

/**
 * Add an event listener to the search form to call the handleFormSubmit function
 * when the form is submitted
 */
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("form.search-form");
    searchForm.addEventListener("submit", handleFormSubmit);
});


/**
 * Handles form submission when the user clicks the "search" button or hits Enter in the search field.
 * Sends a search query to the Google Places API and displays the results on the map.
 * @param {event} event - The submit event.
 */
// function handleFormSubmit(event) {
//     event.preventDefault(); // Prevents the form from submitting and reloading the page
//     const input = document.getElementById('search-input'); // Get the search input element
//     const category = document.getElementById('category-select').value; // Get the selected category from the dropdown
//     const request = {
//         location: userLocation, // Use the user's current location as the search location
//         query: input.value, // Use the text entered by the user as the search query
//         type: ['restaurant'], // Limit the search results to restaurants
//         fields: ['name', 'geometry', 'rating', 'price_level', 'vicinity', 'photos'], // Request specific fields for each search result
//     };
//     if (category) {
//         request.keyword = category; // If a category is selected, add it to the search request
//     }
//     const service = new google.maps.places.PlacesService(map); // Create a new PlacesService object for the map
//     service.textSearch(request, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             markers = []; // Clear the existing markers array
//             // Add new markers for each restaurant result
//             for (let i = 0; i < results.length; i++) {
//                 createMarker(results[i], map);
//             }
//             // Zoom map to fit all markers
//             const bounds = new google.maps.LatLngBounds();
//             markers.forEach(function(marker) {
//                 bounds.extend(marker.getPosition());
//             });
//             map.fitBounds(bounds);
//         }
//     });
// }

// Create an array to store the markers


// Function to clear markers from the map
function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}



async function handleFormSubmit(event) {
    event.preventDefault();

    const searchTerm = document.getElementById('search-input').value;
    const cuisineType = document.getElementById('category-select').value;
    let url;

    if (searchTerm === '' && cuisineType === '') {
        url = 'restaurants/getAllRestaurants';
    } else if (cuisineType !== '') {
        url = 'restaurants/getCuisineType?searchTerm=' + encodeURIComponent(cuisineType);
    } else {
        url = 'restaurants/getRestaurants?searchTerm=' + encodeURIComponent(searchTerm);
    }

    try {
        const response = await fetch(url);
        const restaurantsData = await response.json();
        
        const restaurants = await Promise.all(
            restaurantsData.map(async (restaurant) => {
                try {
                    const searchLocation = `${restaurant.address_}, ${restaurant.city}, ${restaurant.state_}, ${restaurant.zip_code}`;
                    const location = await geocodeRestaurants(searchLocation);
                    return {
                        name: restaurant.restaurant_Name,
                        address: searchLocation,
                        lat: location.lat,
                        lng: location.lng,
                    };
                } catch (error) {
                    console.error(`Error geocoding address for ${restaurant.restaurant_Name}: ${error.message}`);
                    return null;
                }
            })
        );

        console.log("Geocoded restaurant data:", restaurants);

        const validRestaurants = restaurants.filter((restaurant) => restaurant !== null);

        clearMarkers();

        for (const restaurant of validRestaurants) {
            createMarker(restaurant, map);
        }

        console.log("Created markers:", markers);

        const bounds = new google.maps.LatLngBounds();
        markers.forEach(function (marker) {
            bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
    } catch (error) {
        console.error(`Error fetching and processing restaurant data: ${error.message}`);
    }
}



async function fetchRestaurants() {
    const response = await fetch('restaurants/getAllRestaurants');

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error fetching restaurants: ${response.statusText}`);
    }
}


/**
 * Create a new marker for a given place and add it to the map
 * @param {Object} place - The place for which to create the marker
 * @param {Object} map - The Google Maps map object
 */
// function createMarker(place, map) {

//     console.log("Place object properties:");
//     console.log("Name:", place.name);
//     console.log("Address:", place.vicinity || place.address);
//     console.log("Rating:", place.rating);
//     console.log("Price level:", place.price_level);
//     console.log("Photos:", place.photos);


//     console.log("Received place object:", place);

//     if (!place || !place.geometry || !place.geometry.location) {
//         console.error("Invalid place object:", place);
//         return;
//     }
//     // Create a new marker object
//     const marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });

//     // Add the new marker to the array of markers
//     markers.push(marker);

//     // Create a string of dollar signs to represent the price level of the restaurant
//     let price = '';
//     for (let i = 0; i < place.price_level; i++) {
//         price += '$';
//     }

//     // Generate a Google Maps URL for the restaurant
//     const url = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;

//     // Create the HTML content for the info window associated with the marker
//     const content = '<div class="info-window">' +
//         '<h3>' + place.name + '</h3>' +
//         '<p>' + 'Address: ' + place.vicinity + '</p>' +
//         '<p>' + 'Rating: ' + place.rating + ' stars ' + '</p>' +
//         '<p><i class="fas fa-utensils"></i> Price: ' + price + '</p>' +
//         '<p><i class="fas fa-map-marker-alt"></i> Distance: ' + getDistance(place.geometry.location, map.center).toFixed(1) + ' mi</p>' +
//         '<p>' + `<a href="${url}" target="_blank" style="color: blue">view in google maps</a>` + '</p>' +
//         '<img src="' + place.photos[0].getUrl({maxHeight: 200, maxWidth: 200}) + '" alt="">' +
//         '</div>';

//     // Add a click listener to the marker to open the info window when clicked
//     marker.addListener('click', function() {
//         infoWindow.setContent(content);
//         infoWindow.open(map, marker);
//     });
//      // Log the created marker for debugging
//      console.log("Created marker:", marker);
// }

function createMarker(restaurant, map) {
    console.log(`Creating marker for ${restaurant.name}`);
    const marker = new google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        title: restaurant.name,
    });

    markers.push(marker);

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`,
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}


/**
 * Calculates the distance in miles between two points on the Earth's surface using the Haversine formula.
 * @param {Object} p1 - The coordinates of the first point as an object with 'lat' and 'lng' properties.
 * @param {Object} p2 - The coordinates of the second point as an object with 'lat' and 'lng' properties.
 * @returns {number} - The distance in miles between the two points.
 */
function getDistance(p1, p2) {
    // Convert degrees to radians
    const rad = function (x) {
        return x * Math.PI / 180;
    };

    // Earth’s mean radius in meters
    const R = 6378137;

    // Calculate differences between the latitudes and longitudes of the two points
    const dLat = rad(p2.lat() - p1.lat());
    const dLong = rad(p2.lng() - p1.lng());

    // Apply the Haversine formula to compute the distance
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    // Convert meters to miles and return the result
    return d / 1609.344;
}

/**
 * Handles errors related to location services, displaying an error message in the info window.
 * @param {boolean} browserHasGeolocation - True if the user's browser supports geolocation, false otherwise.
 * @param {google.maps.InfoWindow} infoWindow - The info window to display the error message in.
 * @param {google.maps.LatLng} pos - The position to center the info window on.
 */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    // Set the position of the info window and display an appropriate error message
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// prototype functions moving forward

async function geocodeAddress(geocoder, address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve(results[0].geometry.location);
            } else {
                reject(new Error("Geocode was not successful for the following reason: " + status));
            }
        });
    });
}

async function geocodeRestaurants(address) {
    const API_KEY = "AIzaSyCqqeOdsPM-latuhbnfIieM8IAMJzGtfG4";
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error(`Failed to geocode address: ${address}`);
    }

    const data = await response.json();
    if (data.status !== "OK") {
        throw new Error(`Geocoding error: ${data.status}`);
    }

    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
}






