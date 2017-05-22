
 console.log(map);

      <!-- <div id=listing{{ listing.listing_id }}  class=marker-div data-business={{ listing.business }} data-address={{ listing.address }} data-lat={{ listing.lat }} data-lng={{ listing.lng }}></div> 

          <script>  
              var lat = $('#listing{{ listing.listing_id }}').data('lat');
              var lng = $('#listing{{ listing.listing_id }}').data('lng');
       
              var marker = new google.maps.Marker( {
                  location : {lat: lat , lng: lng},
                  map : map
                  })
          </script> -->
<!-- 
          Im going to need to save markers in an array -->




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
  });



