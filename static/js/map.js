

function initMap() {

  // Intial map hard coded to center of the Bay Area
  var bayMap = {lat: 37.594, lng: -122.200};
  var myLatLng = bayMap
  var geocoder = new google.maps.Geocoder();

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('diana-map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 10,
    zoomControl: true,
    panControl: false,
    streetViewControl: false,
    // styles: MAPSTYLES,
    // mapTypeId: google.maps.MapTypeId
  });



  //******** NEW ***********
  // Adds map listener; updates map markers on changes to map once user
  // idles from map panning/zooming


  // map.addListener('idle', function() {
  //   // If the user is searching within a region use the map listener,
  //   // otherwise a single address search should not update
  //   // listings shown on map when the map view changes
  //   if (map.zoom >= 13){
  //     // Once map is zoomed in, change to click instructions
  //     // then check search filters before returning listing results
  //       checkFilters();
  //     }

  // });



  var infoWindow = new google.maps.InfoWindow({
      width: 150
  });
    


   // Retrieving the information with AJAX
  $.get('/listings.json', function (listings) {

    var listing, marker, html, markerCluster;


    var markers = []

      for (var key in listings) {
          listing = listings[key];

          // Define the marker
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(listing.Lat, listing.Long),
              map: map,
              title: 'Listing Name: ' + listing.business,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          })
          //To be used for clusters... need a list of markers.
          markers.push(marker);

          // Define the content of the infoWindow
          // hold off on image in a database
          html = (
              '<div class="window-content">' +
                  '<img src="google-maps-demo/static/img/polarbear.jpg" alt="listing" style="width:150px;" class="thumbnail">' +
                  '<p><b>Business Name: </b>' + listing.business + '</p>' +
                  '<p><b>Address: </b>' + listing.address + '</p>' +
                  '<p><b>Ad Height: </b>' + listing.heightmax + '</p>' +
                  '<p><b>Ad Width: </b>' + listing.widthmax + '</p>' +
                  '<p><b>Location: </b>' + marker.position + '</p>' +
                  '<button onclick="window.location.href=\'/listings/' + key + '\'">Select Listing</button>' + 
              '</div>');

           bindInfoWindow(marker, map, infoWindow, html);
      }


      var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      
  });


  function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.close();
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
      });
  }

}




function zipcode_zoom(zipcode) {
  console.log(zipcode)
  $.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode, function (zipcode_json) {
          
          var latlng = zipcode_json.results[0].geometry.location;
          console.log(latlng);
          console.log(map);
          map.panTo(latlng);
          map.setZoom(15)
    });
}






  //******** NEW *********** FROM SOURCE

// Gets filter values and requests the server for a database query on those values
function checkFilters(){
  // Extract the map boundaries from geocoded location
  var bounds = map.getBounds();
  // if (bounds){
  //   var geoBounds = JSON.stringify(bounds);
  // // If no boundaries exist, use map viewport box from geocoded location
  // } else {
    var viewport = results[0].geometry.viewport;
    var geoBounds = JSON.stringify(viewport);
  // }

  // Grab filter values and send to server as an object
  var priceFilter = $("#slider-range").slider("values");
  var lowPrice = priceFilter[0];
  var highPrice = priceFilter[1];

  var bedroomFilter = $('#bedroom-filter').html();
  if (bedroomFilter === 'Any') {
    bedroomFilter = 0;
  } else {
    bedroomFilter = parseInt(bedroomFilter)
  }

  var bathroomFilter = $('#bathroom-filter').html();
  if (bathroomFilter === 'Any') {
    bathroomFilter = 0;
  } else {
    bathroomFilter = parseInt(bathroomFilter)
  }

  var filters = {'geoBounds': geoBounds,
                 'lowPrice': lowPrice, 
                 'highPrice': highPrice, 
                 'bedroomFilter': bedroomFilter, 
                 'bathroomFilter': bathroomFilter}

  $.get('/listings.json', filters, addListingMarkers)
}


// // Shows user interaction map instructions
// function zoomMapInstructions(){
//   $('#map-notification').html('Zoom in on map to see listings for sale in the area.');
// }


// // Hides user interaction map instructions
// function clickMapInstructions(){
//   $('#map-notification').html('Select a listing on the map to see more details.');
// }


// For all locations for sale within the map boundaries,
// show markers for each location
function addListingMarkers(listings){
  deleteMarkers();
  for (var i=0; i < listings.length; i++){
    var listing = listings[i];
    var latitude = parseFloat(listing['latitude']);
    var longitude = parseFloat(listing['longitude']);

    // Creates a marker for each listing
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: latitude, lng: longitude},
      details: listing,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    attachListener(marker, listing);

    // Stores each marker in global markers array
    if (!(markers.has(marker))){
      markers.add(marker);
    }
  }
}


// google.maps.event.addDomListener(window, 'load', initMap);




// ############################# everything below here comment out #############################

