var map;
var place;
var autocomplete;
var infowindow = new google.maps.InfoWindow();

function initialization() {
    //showAllReports();
    //initAutocomplete();
    mapInitialization();
}

function showAllReports() {
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: { "tab_id": "1"},
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("An AJAX error occured: " + status + "\nError: " + error);
        }
    });
}

function mapInitialization(reports) {
    var mapOptions = {

        zoom: 10,
        center: {lat: 43.0731, lng: -89.4012},
        mapTypeId : 'roadmap' // Set the type of Map
    };

    // Render the map within the empty div
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //
    // $.each(reports, function(i, e) {
    //     var long = Number(e['longitude']);
    //     var lat = Number(e['latitude']);
    //     var latlng = new google.maps.LatLng(lat, long);
    //
    //     bounds.extend(latlng);
    //
    //     // Create the infoWindow content
    //     var contentStr = '<h4>Report Details</h4><hr>';
    //     contentStr += '<p><b>' + 'Disaster' + ':</b>&nbsp' + e['disaster'] + '</p>';
    //     contentStr += '<p><b>' + 'Report Type' + ':</b>&nbsp' + e['report_type'] +
    //         '</p>';
    //     if (e['report_type'] == 'request' || e['report_type'] == 'donation') {
    //         contentStr += '<p><b>' + 'Resource Type' + ':</b>&nbsp' +
    //             e['resource_type'] + '</p>';
    //     }
    //     else if (e['report_type'] == 'damage') {
    //         contentStr += '<p><b>' + 'Damage Type' + ':</b>&nbsp' + e['damage_type']
    //             + '</p>';
    //     }
    //     // Question 1: add reporter name field to info window
    //     contentStr += '<p><b>' + 'Reporter' + ':</b>&nbsp' + e['first_name'] + ' ' + e['last_name'] + '</p>';
    //     contentStr += '<p><b>' + 'Timestamp' + ':</b>&nbsp' +
    //         e['time_stamp'].substring(0,19) + '</p>';
    //     if ('message' in e){
    //         contentStr += '<p><b>' + 'Message' + ':</b>&nbsp' + e['message'] + '</p>';
    //     }
    //
    //     // Question 2: change marker icons depending on report type
    //     var image;
    //
    //     if (e['report_type'] == 'damage') {
    //         image = 'img/damage.png';
    //     }
    //     else if (e['report_type'] == 'donation') {
    //         image = 'img/donation.png';
    //     }
    //     else if (e['report_type'] == 'request') {
    //         image = 'img/request.png';
    //     }
    //
    //     var icon = {
    //         url: image,
    //         scaledSize: new google.maps.Size(20, 20)
    //     }
    //
    //     // Create the marker
    //     var marker = new google.maps.Marker({ // Set the marker
    //         position : latlng, // Position marker to coordinates
    //         map : map, // assign the market to our map variable
    //         icon: icon, // insert icon based on report_type
    //         customInfo: contentStr,
    //     });
    //
    //     // Add a Click Listener to the marker
    //     google.maps.event.addListener(marker, 'click', function() {
    //         // use 'customInfo' to customize infoWindow
    //         infowindow.setContent(marker['customInfo']);
    //         infowindow.open(map, marker); // Open InfoWindow
    //     });
    //
    // });

    //map.fitBounds (bounds);

}

function initAutocomplete() {
    // Create the autocomplete object
    autocomplete = new google.maps.places.Autocomplete(document
        .getElementById('autocomplete'));

    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']
    );

    // When the user selects an address from the dropdown, show the place selected
    autocomplete.addListener('place_changed', onPlaceChanged);
}

// Question 3: center the map on entered autocomplete location
function onPlaceChanged() {
    place = autocomplete.getPlace();
    // console.log(place);
    if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(10);
    }

};

//Execute our 'initialization' function once the page has loaded.
google.maps.event.addDomListener(window, 'load', initialization);
