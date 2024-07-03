 
//  function calculateAndShowPopup(layer) {
//     var latlngs = layer.getLatLngs();
//     if (latlngs.length > 1) {
//         var from = turf.point([latlngs[0].lng, latlngs[0].lat]);
//         var to = turf.point([latlngs[1].lng, latlngs[1].lat]);
//         var options = { units: 'meters' };
//         var distance = turf.distance(from, to, options).toFixed(2);
//         var bearing = turf.bearing(from, to).toFixed(2);

//         // Calculate midpoint for placing the popup
//         var midpoint = turf.midpoint(from, to);
//         var midpointLatLng = [midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]];

//         // Create popup content
//         var popupContent = 'Distance: ' + distance + ' meters<br>Bearing: ' + bearing + ' degrees';

//         // Open popup on the map
//         L.popup()
//             .setLatLng(midpointLatLng)
//             .setContent(popupContent)
//             .openOn(map);

//         // Attach click event to the layer to show the popup
//         layer.on('click', function(e) {
//                         selectLayer(e.target);

//             L.popup()
//                 .setLatLng(midpointLatLng)
//                 .setContent(popupContent)
//                 .openOn(map);
//         });

        
//     }
// }

 

// map.on(L.Draw.Event.CREATED, function(event) {
//     var layer = event.layer;
//     editableLayers.addLayer(layer);
//     calculateAndShowPopup(layer);
// });

// map.on('draw:edited', function(event) {
//     var layers = event.layers;
//     layers.eachLayer(function(layer) {
//         calculateAndShowPopup(layer);
//     });
// });
 
// document.getElementById('drawDottedLine').onclick = function() {
//     var dottedLineDrawer = new L.Draw.Polyline(map, {
//         shapeOptions: {
//             color: 'blue',
//             weight: 3,
//             opacity: 0.7,
//             dashArray: '10, 10'
//         }
//     });

//     dottedLineDrawer.enable();
// };




 
// //   -----------------------------------------------------
//         // function enableDrawDottedLineMode() {
//         //     var dottedLineDrawer = new L.Draw.Polyline(map, {
//         //         shapeOptions: {
//         //             color: 'blue',
//         //             weight: 3,
//         //             opacity: 0.7,
//         //             dashArray: '10, 10'
//         //         }
//         //     });

//         //     dottedLineDrawer.enable();

//         //     map.once('draw:created', function(event) {
//         //         var layer = event.layer;
//         //         editableLayers.addLayer(layer);

//         //         var latlngs = layer.getLatLngs();
//         //         if (latlngs.length > 1) {
//         //             var from = turf.point([latlngs[0].lng, latlngs[0].lat]);
//         //             var to = turf.point([latlngs[1].lng, latlngs[1].lat]);
//         //             var options = { units: 'meters' };
//         //             var distance = turf.distance(from, to, options).toFixed(2);
//         //             var bearing = turf.bearing(from, to).toFixed(2);

//         //             // Calculate midpoint for placing the popup
//         //             var midpoint = turf.midpoint(from, to);
//         //             var midpointLatLng = [midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]];

//         //             // Create popup content
//         //             var popupContent = 'Distance: ' + distance + ' meters<br>Bearing: ' + bearing + ' degrees';

//         //             // Add click event to the layer
//         //             layer.on('click', function() {
//         //                 L.popup()
//         //                     .setLatLng(midpointLatLng)
//         //                     .setContent(popupContent)
//         //                     .openOn(map);
//         //             });
//         //         }

//         //         dottedLineDrawer.disable();
//         //         layer.on('click', function(e) {
//         //             selectLayer(e.target);
//         //         });
//         //     });
//         // }


//         // document.getElementById('drawDottedLine').onclick = function() {

//         //     enableDrawDottedLineMode();
//         // };
// // --------------------------
//         // function selectLayer(layer) {
//         //     // Logic to select a layer
//         //     // You can implement your own selection logic here
//         //     console.log('Layer selected:', layer);
//         // }
 

// // Event listener for drawing a dotted line polyline
// //    document.getElementById('drawDottedLine').onclick = function() {
// //     enableDrawDottedLineMode();
// //     var dottedLineDrawer = new L.Draw.Polyline(map, {
// //         shapeOptions: {
// //             color: 'blue',
// //             weight: 3,
// //             opacity: 0.7,
// //             dashArray: '10, 10' // Define your desired dash pattern here
// //         },

// //     });
// //      dottedLineDrawer.enable();
 


// //     map.once('draw:created', function(event) {
// //         var layer = event.layer;
// //         editableLayers.addLayer(layer);
// //         dottedLineDrawer.disable();
// //         layer.on('click', function(e) {
// //             selectLayer(e.target);

            
// //         });
// //     });
// // };



let startPointx = null;
// let currentCoordinates = document.getElementById('coordinatesx');
let currentBearing = document.getElementById('bearingx');
let currentDistance = document.getElementById('distancex');

// Function to calculate bearing using Turf.js
function calculateBearing(from, to) {
  return turf.bearing(from, to).toFixed(2);
}

// Function to calculate distance using Turf.js
function calculateDistance(from, to) {
  return turf.distance(from, to, { units: 'meters' }).toFixed(2);
}

// Function to calculate and show popup
function calculateAndShowPopup(layer) {
  const latlngs = layer.getLatLngs();
  if (latlngs.length > 1) {
    const from = turf.point([latlngs[0].lng, latlngs[0].lat]);
    const to = turf.point([latlngs[1].lng, latlngs[1].lat]);
    const distance = calculateDistance(from, to);
    const bearing = calculateBearing(from, to);

    const midpoint = turf.midpoint(from, to);
    const midpointLatLng = [midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]];

    const popupContent = `Distance: ${distance} meters<br>Bearing: ${bearing} degrees`;

    L.popup()
      .setLatLng(midpointLatLng)
      .setContent(popupContent)
      .openOn(map);

    layer.on('click', function(e) {
      selectLayer(e.target);
      L.popup()
        .setLatLng(midpointLatLng)
        .setContent(popupContent)
        .openOn(map);
    });
  }
}


map.on('draw:drawstart', function() {
    console.log('Drawing started');
    map.on('mousemove', onMouseMove);
    // startPoint = null;
  });


// Handle line creation
map.on(L.Draw.Event.CREATED, function(event) {
  if (currentDrawObject === "dottedLine") {
    const layer = event.layer;

    editableLayers.addLayer(layer);
    calculateAndShowPopup(layer);
    map.off('mousemove', onMouseMove);
    startPointx =null;
  currentDrawObject = ""


    
  }



});

// Handle line edit
map.on('draw:edited', function(event) {
  if (currentDrawObject === "dottedLine") {
    startPointx =null;

    const layers = event.layers;
    layers.eachLayer(function(layer) {
      calculateAndShowPopup(layer);
    });
    currentDrawObject = ""


  }

});

// Enable drawing of a dotted line
document.getElementById('drawDottedLine').onclick = function() {
  currentDrawObject = "dottedLine"

    currentBearing.innerText =   '0°';
    currentDistance.innerText =   '0 meters';
  const dottedLineDrawer = new L.Draw.Polyline(map, {
    shapeOptions: {
      color: 'blue',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 5'
    }
  });

  dottedLineDrawer.enable();

  map.on('draw:drawstart', function() {
    map.on('mousemove', onMouseMove);
  });

  map.on('draw:drawstop', function() {
    map.off('mousemove', onMouseMove);
  });
 

};

// Handle mouse move to show real-time distance and bearing
function onMouseMove(e) {
  const latLng = e.latlng;
//   currentCoordinates.innerText = latLng.lat.toFixed(5) + ', ' + latLng.lng.toFixed(5);

  if (startPointx) {
    const from = turf.point([startPointx.lng, startPointx.lat]);
    const to = turf.point([latLng.lng, latLng.lat]);
    const bearing = calculateBearing(from, to);
    const distance = calculateDistance(from, to);
    currentBearing.innerText = bearing + '°';
    currentDistance.innerText = distance + ' meters';
  }
}

map.on('click', function(e) {
  const latLng = e.latlng;

  if (!startPointx) {
    startPointx = latLng;
  } else {
    startPointx = null;
  }
});
