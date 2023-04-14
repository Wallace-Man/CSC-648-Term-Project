var infowindow;

function initMap() {
    infowindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: userLocation
            });
            const service = new google.maps.places.PlacesService(map);
            const request = {
                location: userLocation,
                // set search radius for rendering map pins of food places
                radius: '1500',
                type: ['restaurant']
            };
            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i], map);
                    }
                }
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function createMarker(place, map) {
    //set marker on map for each restaurant within specified radius
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // google places api ranks average meal prices from 0-4 to base cost of restaurant. 0 being free and 4 being very expensive
    let price = '';
    for (let i = 0; i < place.price_level; i++) {
        price += '$';
    }

    // render info window information about clicked on restaurant
    const content = '<div class="info-window">' +
        '<h3>' + place.name + '</h3>' +
        '<p>' + 'Address: ' + place.vicinity + '</p>' +
        // 'Phone: ' + place.phone_number + '<br>' +
        // 'Website: <a href="' + place.website + '">' + place.website + '</a>' +
        '<p>' + 'Rating: ' + place.rating + ' stars ' + '</p>' +
        '<p><i class="fas fa-utensils"></i> Price: ' + price + '</p>' +
        '<p><i class="fas fa-map-marker-alt"></i> Distance: ' + getDistance(place.geometry.location, map.getCenter()).toFixed(1) + ' mi</p>' +
        '<img src="' + place.photos[0].getUrl({maxHeight: 200, maxWidth: 200}) + '" alt="">' +
        '</div>';

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(content);
        infowindow.open(map, this);
    });
}

function getDistance(p1, p2) {
    const rad = function (x) {
        return x * Math.PI / 180;
    };
    const R = 6378137; // Earth’s mean radius in meters
    const dLat = rad(p2.lat() - p1.lat());
    const dLong = rad(p2.lng() - p1.lng());
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d / 1609.344; // convert to miles
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infowindow.open(map);
}
