

function initMap() {

  // Intial map hard coded to center of the Bay Area
  // Defining this variable outside of the map optios markers
  // it easier to dynamically change if you need to recenter
  var bayMap = {lat: 37.594, lng: -122.200};
  var myLatLng = bayMap

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('diana-map'), {
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

    var listing, marker, html;

      for (var key in listings) {
          listing = listings[key];

          // Define the marker
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(listing.Lat, listing.Long),
              map: map,
              title: 'Listing Name: ' + listing.business,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          })

          // Define the content of the infoWindow
          html = (
              '<div class="window-content">' +
                  '<img src="google-maps-demo/static/img/polarbear.jpg" alt="listing" style="width:150px;" class="thumbnail">' +
                  '<p><b>Business Name: </b>' + listing.business + '</p>' +
                  '<p><b>Address: </b>' + listing.address + '</p>' +
                  '<p><b>Ad Height: </b>' + listing.heightmax + '</p>' +
                  '<p><b>Ad Width: </b>' + listing.widthmax + '</p>' +
                  '<p><b>Location: </b>' + marker.position + '</p>' +
                  '<p>Attribution: <a href="/new_listing">'+
                  'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                              '</p>'+
              '</div>');

           bindInfoWindow(marker, map, infoWindow, html);
      }

  });




  function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.close();
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
      });
  }


  // //////////////////////////
  // // geocoding by address //
  // //////////////////////////

  // function addHackbrightByAddress() {
  //   var hackbright = new google.maps.Geocoder();
  //   var address = "683 Sutter Street, San Francisco, CA";

  //   hackbright.geocode({'address': address}, 
  //     function(results, status) {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         map.setCenter(results[0].geometry.location);
  //         var marker = new google.maps.Marker({
  //           map: map,
  //           position: results[0].geometry.location
  //         });
  //       } else {
  //         alert('Geocode was not successful for the following reason: ' + status);
  //       }
  //   });
  // }

  // // addHackbrightByAddress();


}

google.maps.event.addDomListener(window, 'load', initMap);




// ############################# everything below here comment out #############################

