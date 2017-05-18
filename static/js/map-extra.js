map-extra.js

$(document).ready(function() {

});


var myLatlng = new google.maps.LatLng(37.594,-122.200);
    var myOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);