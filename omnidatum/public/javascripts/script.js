// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMarker(sentiment) {
  var pinColor; // color is a hex value without leading #.

  if (sentiment == 'Positive'){
    pinColor ="26D64F";
  } else if (sentiment == 'Negative'){
    pinColor = "D7263D";
  } else {
    pinColor = "FDE74C";
  }

  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
  new google.maps.Size(21, 34),
  new google.maps.Point(0,0),
  new google.maps.Point(10, 34));
  var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
  new google.maps.Size(40, 37),
  new google.maps.Point(0, 0),
  new google.maps.Point(12, 35));

  return pinImage;
}

function getColor(sentiment) {
  var pinColor; // color is a hex value without leading #.

  if (sentiment == 'Positive'){
    pinColor ="#F00";
  } else if (sentiment == 'Negative'){
    pinColor = "#FF0";
  } else {
    pinColor = "#0F0";
  }

  return pinColor;
}

function initMap() {
  var center = {lat: 0, lng: 163.4719644};
  if (q == 'trump') {
    center = {lat: 35.0931652, lng: -95.527725};
  } else if (q == 'rio,olmpics') {
    center = {lat: -22.9103552, lng: -43.7285295};
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: center,
    disableDefaultUI: true, // Hide all controls.
    mapTypeControl: false,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    },
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:
    [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#444444"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#7bb3a1"
          },
          {
            "visibility": "on"
          },
          {
            "lightness": "10"
          },
          {
            "gamma": "1.00"
          },
          {
            "weight": "1.00"
          },
          {
            "saturation": "13"
          }
        ]
      }
    ]
  });

  // heatmap = new google.maps.visualization.HeatmapLayer({
  //   data: getPoints(),
  //   map: map
  // });

  var prev_infowindow = false;

  var posMarkers = [];
  var negMarkers = [];
  var neuMarkers = [];

  data.forEach(function(tweet){
    var text = tweet.text + "<br><br>" + "@" + tweet.name;
    var infowindow = new google.maps.InfoWindow({
      content: text
    });

    var marker = new google.maps.Marker({
      position: {lat: tweet.coordinates[1], lng: tweet.coordinates[0]},
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillOpacity: 0.5,
        fillColor: getColor(tweet.sentiment),
        strokeWeight: 0
      },

    });

    marker.addListener('click', function() {
      if( prev_infowindow ) {
        prev_infowindow.close();
      }
      prev_infowindow = infowindow;
      infowindow.open(map, marker);
    });

    if (tweet.sentiment == 'Positive'){
      posMarkers.push(marker);
    } else if (tweet.sentiment == 'Negative'){
      negMarkers.push(marker);
    } else {
      neuMarkers.push(marker);
    }
  });

  // var markerClusterPos = new MarkerClusterer(map, posMarkers, {imagePath: 'javascripts/images/m'});
  // var markerClusterNeu = new MarkerClusterer(map, neuMarkers, {imagePath: 'javascripts/images/m'});
  // var markerClusterNeg = new MarkerClusterer(map, negMarkers, {imagePath: 'javascripts/images/m'});

}

// Heatmap data
function getPoints() {
  var points = [];
  var posMarkers = [];
  var negMarkers = [];
  var neuMarkers = [];

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
