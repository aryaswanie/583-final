//the file
google.maps.event.addDomListener(window, "load", initialize);

// function initMap() {
//     var myLatLng = {lat: -25.363, lng: 131.044};
//
//     map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 2,
//       center: new google.maps.LatLng(102.8,-187.3),
//       mapTypeId: 'terrain'
//     });
//
//     // Create a <script> tag and set the USGS URL as the source.
//     var script = document.createElement('script');
//     // This example uses a local copy of the GeoJSON stored at
//     // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//     script.src = 'https://raw.githubusercontent.com/aryaswanie/mj583/master/data.json';
//     document.getElementsByTagName('head')[0].appendChild(script);
//
//     var marker = new google.maps.Marker({
//           map: map,
//           position: myLatLng,
//           title: 'Hello World!'
//         });
//   }
//


  function initialize() {
      var latlng = new google.maps.LatLng(-33.9277, 151.0272);
      var myLatLng = {lat: -33.9277, lng: 151.0272};
      var myOptions = {
          zoom: 8,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map_canvas"),
              myOptions);
      var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
      });
      var script = document.createElement('script');
      script.src = 'https://raw.githubusercontent.com/aryaswanie/mj583/master/data.json';
      document.getElementsByTagName('head')[0].appendChild(script);

      //text
    //   var locations = [
    //   ['Bondi Beach', -33.890542, 151.274856, 4],
    //   ['Coogee Beach', -33.923036, 151.259052, 5],
    //   ['Cronulla Beach', -34.028249, 151.157507, 3],
    //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //   ['Maroubra Beach', -33.950198, 151.259302, 1]
    // ];
    //
    // var infowindow = new google.maps.InfoWindow();
    //
    // var marker, i;
    //
    // for (i = 0; i < locations.length; i++) {
    //   var marker = new google.maps.Marker({({
    //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //     map: map
    //   });
    //
    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //     return function() {
    //       infowindow.setContent(locations[i][0]);
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i));
    // }

      // window.eqfeed_callback = function(results) {
      //   for (var i = 0; i < results.features.length; i++) {
      //     var coords = results.features[i].geometry.coordinates;
      //     var latLng = new google.maps.LatLng(coords[1],coords[0]);
      //     var marker = new google.maps.Marker({
      //       position: latLng,
      //       map: map
      //     });
        // }
      // }
  }

    var map;

    // function addMarkers() {
    //
    //     {% for mark in theater %}
    //       var point = new google.maps.LatLng({{mark.position.lat}},{{mark.position.long}});
    //           var image = '{{ STATIC_PREFIX }}'+ 'checkmark.png';
    //           var marker = new google.maps.Marker({
    //           position: point,
    //           map: map,
    //           icon: image,
    //           url: 'http://127.0.0.1:8000/movies/theater/' + {{mark.id}},
    //          title: '{{ mark.id }}',
    //       });
    //            marker['infowindow']  = new google.maps.InfoWindow({
    //                    content: "<h1>{{mark.name}}</h1> <br> {{ mark.name }} <p> <a href=\"http:\/\/172.16.0.101:8882\/theater\/{{ mark.id }}\"> {{ mark.name }}</a>",
    //       });
    //           google.maps.event.addListener(marker, 'click', function() {
    //               //window.location.href = this.url;
    //                this['infowindow'].open(map, this);
    //           });
    //          google.maps.event.addListener(marker, 'mouseover', function() {
    //               // this['infowindow'].open(map, this);
    //                   });
    //          google.maps.event.addListener(marker, 'mouseout', function() {
    //               // this['infowindow'].close(map, this);
    //
    //           });
    //
    //       {% endfor %}

  // function initMap() {
  //   var myLatLng = {lat: -25.363, lng: 131.044};
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: myLatLng,
  //     zoom: 4
  //   });
  //
  //   // Create a marker and set its position.
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: myLatLng,
  //     title: 'Hello World!'
  //   });
  // }


  // Loop through the results array and place a marker for each
  // set of coordinates.

  function fetchData() {
      $.get("https://raw.githubusercontent.com/aryaswanie/mj583/master/data.json")
          .done(function(data) {
              $('#raw-json').text(JSON.stringify(data, null, '  '));
              // Add data to global container
              window.movies.data = data;
          })
          .fail(function(){
              console.log("Could not load data");
              alert("Could not load data");
          });
  }

function handleDataLoaded(data) {
    window.mysite.data = data
    $('#raw-json').text(JSON.stringify(data, null, '  '));
    if (window.mysite.mapReady) {
        window.mysite.render();
    }
    if (window.mysite.barReady) {
        window.mysite.renderBar();
    }
}

// watchSelections adds event handlers to track changes users make to selections
// on the page and fetch new data.
function watchSelections() {
    var countrySel = $('#sel-country');
    var categorySel = $('#sel-category');
    var genderSel = $('#sel-gender');

    function updateSelections() {
        var params = window.mysite.params || {};
        params.country = countrySel.val();
        params.category = categorySel.val();
        params.gender = genderSel.val();
        window.mysite.params = params;
        fetchData(handleDataLoaded);
    }

    countrySel.on('change', updateSelections);
    categorySel.on('change', updateSelections);
    genderSel.on('change', updateSelections);
    updateSelections();
}

$(function() {
    // Create a global var to hold our data & state
    window.mysite = {};

    // Update our data based on what's selected
    watchSelections();

    // initMap is from map.js
    initMap(window.mysite);

    // initBar is from bar.js
    initBar(window.mysite);
})
