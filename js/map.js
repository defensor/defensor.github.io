$(document).ready(function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 59.868, lng: 30.307 },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(59.867499, 30.310691),
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: "Место встречи сурьезных людей за чашечкой чая"
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

})
