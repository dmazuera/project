function initMap() {

  // Specify where the map is centered
  // Defining this variable outside of the map optios markers
  // it easier to dynamically change if you need to recenter
  var myLatLng = {lat: 37.594, lng: -122.200};

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
}

google.maps.event.addDomListener(window, 'load', initMap);
