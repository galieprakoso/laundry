var markers = [];

function initAutocomplete() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -6.3583925, lng: 106.875833},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });


  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
		zoom: 8,
        title: place.name,
        position: place.geometry.location,
		draggable:true
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

  });
  // [END region_getplaces]
}

function initMap(lat,lang,tujuan_lat,tujuan_lng) {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('map_detail'), {
		center: {lat: parseFloat(tujuan_lat), lng: parseFloat(tujuan_lng)},
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	});
	directionsDisplay.setMap(map);
	var alamat = { lat: parseFloat(tujuan_lat), lng: parseFloat(tujuan_lng) };
	calculateAndDisplayRoute(directionsService, directionsDisplay,alamat,lat,lang,'status');
}
function calculateAndDisplayRoute(directionsService, directionsDisplay,end,lat,lang,status) {
	if(status == 'SET')
	{
		directionsDisplay.setMap(mapTowing1);
	}
	
	var mulai = {lat: parseFloat(lat), lng: parseFloat(lang)};
	directionsService.route({
		origin: mulai,
		destination: end,
		travelMode: google.maps.TravelMode.WALKING,
		avoidTolls: true
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
		console.log("Remove All Markers");
	}
	
	if(status == 'RESET')
	{
		directionsDisplay.setMap(null);
	}
}


function get_marker()
{
	alert(markers[0].position);
}