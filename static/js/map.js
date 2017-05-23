

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



  var infoWindow = new google.maps.InfoWindow({
      width: 150
  });
    
   // Retrieving the information with AJAX
  $.get('/listings.json', function (listings) {

    var listing, marker, html, markerCluster;
    markers = []


      for (var key in listings) {
          listing = listings[key];

          // Define the marker
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(listing.Lat, listing.Long),
              map: map,
              title: 'Listing Name: ' + listing.business,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          })

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
                  '<p><b>Price: $ </b>' + listing.price + '</p>' +
                  '<button onclick="window.location.href=\'/listings/' + key + '\'">Select Listing</button>' + 
              '</div>');

           bindInfoWindow(marker, map, infoWindow, html);
      }

      var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      
      
  });


 bindInfoWindow= function (marker, map, infoWindow, html) {
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







  //******** NEW *********** 

// Gets filter values and requests the server for a database query on those values
function filter_search(min, max, height, width){
  // Extract the map boundaries from geocoded location
    // var bounds = map.getBounds();
    // var geoBounds = JSON.stringify(bounds);

    console.log(min)
  // Grab filter values and send to server as an object

  //If the values are undefined I need to pass in a 0... and pass a string that i can look out for.
  //Make sure I test for undefined entries

  var highPrice = parseInt(max);
  var lowPrice = parseInt(min);
  var height = parseInt(height);
  var width = parseInt(width);
   console.log(width)

  var filters = {
                 'lowPrice': lowPrice, 
                 'highPrice': highPrice, 
                 'height': height, 
                 'width': width}
  console.log(filters)


  $.get('/filter_search.json', filters, addListingMarkers)
}





// For all locations for sale within the map boundaries,
// show markers for each location
function addListingMarkers(listings){

    deleteMarkers();

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


  var infoWindow = new google.maps.InfoWindow({
      width: 150
  });
    
    var listing, marker, html, markerCluster;
    markers = []


      for (var key in listings) {
          listing = listings[key];

          // Define the marker
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(listing.Lat, listing.Long),
              map: map,
              title: 'Listing Name: ' + listing.business,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          })

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
                  '<p><b>Price: $ </b>' + listing.price + '</p>' +
                  '<button onclick="window.location.href=\'/listings/' + key + '\'">Select Listing</button>' + 
              '</div>');

           bindInfoWindow(marker, map, infoWindow, html);
      }

      zipcode_zoom( document.getElementById("searchTxt").value)

      var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});  
      
      
  };



// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  for (var i = 0;  i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

  

// google.maps.event.addDomListener(window, 'load', initMap);



// ############################# everything below here comment out #############################

