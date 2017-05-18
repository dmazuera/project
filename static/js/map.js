

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




  var nearSF = new google.maps.LatLng(37.594, -122.200)
  var marker = new google.maps.Marker({
      position: nearSF,
      map: map,
      title: 'Hover text'
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

