// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -22.9103552, lng: -43.7285295},
    mapTypeId: 'satellite'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });

  var prev_infowindow = false; 

  data.forEach(function(tweet){

    var infowindow = new google.maps.InfoWindow({
      content: tweet.text
    });

    var marker = new google.maps.Marker({
      position: {lat: tweet.coordinates[1], lng: tweet.coordinates[0]},
      map: map,
    });
    marker.addListener('click', function() {
      if( prev_infowindow ) {
        prev_infowindow.close();
      }
      prev_infowindow = infowindow;
      infowindow.open(map, marker);
    });
  });

}

function getTweets() {
  var tweets = [];
}

// Heatmap data
function getPoints() {
  var points = [];
  data.forEach(function(tweet){
    var lat = tweet.coordinates[0];
    var lng = tweet.coordinates[1];
    points.push(new google.maps.LatLng(lng, lat));
  });

  return points;
}

function doLayout() {
  $('#map').height($(window).height() - $('nav').height());
}

$(document).ready(function(){
  doLayout();
});

$(window).resize(function(){
  doLayout();
});
