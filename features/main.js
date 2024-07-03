// var editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

 var selectedLayersForDelete = [];
 var currentDrawObject = null;





// ######################  Utility #################
function turfPointsToLatLng(turfPoints) {
    return turfPoints.map(function(point) {
        return [point[1], point[0]]; // Turf.js uses [lng, lat] while Leaflet uses [lat, lng]
    });
}

function metersToKilometers(meters) {
    var kilometers = meters / 1000;
    return kilometers;
  }
  
  function kmToMeters(kilometers) {
    return kilometers * 1000;
  }
  
  function cmToKm(cm) {
    var km = cm / 100000; // Divide centimeters by 100,000 to get kilometers
    return km;
  }
  function metersToCentimeters(meters) {
    return meters * 100;
}

  
  function pointsToTurf(point) {
    return point.slice().reverse();
  }
  
  function getLeafletCoords(point) {
    return turf.getCoords(point).slice().reverse();
  }
  


 
function selectLayer(layer) {
  const layerIndex = selectedLayersForDelete.indexOf(layer);

  if (layerIndex !== -1) {
    // Layer is already selected, remove it from the array
    selectedLayersForDelete.splice(layerIndex, 1);
    layer.setStyle({ color: 'blue' }); // Reset to default color
  } else {
    // Layer is not selected, add it to the array
    selectedLayersForDelete.push(layer);
    layer.setStyle({ color: '#57ffe1' }); // Highlight selected layer
  }
}





// Define marker lines
var marker_lines = [
    { distance: 1, height: metersToCentimeters(2), color: "red", start_after: 0.003 },
    { distance: 3, height: metersToCentimeters(4), color: "green", start_after: 0.006 },
    { distance: 12, height: metersToCentimeters(6), color: "blue", start_after: 0.009 },
    { distance: 2, height: metersToCentimeters(2), color: "red", start_after: 0.003 , name :"row | single row | anti peronal"},
    { distance: 12, height: metersToCentimeters(6), color: "green", start_after: 0.009 , name :"row | single row | fragmentation"},
    { distance: 1, height: [metersToCentimeters(2), metersToCentimeters(4)], color: "green", start_after: 0.003 , name :"row | Double row | anti personal"},
    // { distance: 1, height: [metersToCentimeters(2), metersToCentimeters(4)], color: "green", start_after: 0.003 , name :"row | Double row | anti personal"},




];
 


// var markersx = [];
 
 
 


  // Function to draw a custom line
function drawLine(start, end, marker_lines, layer, customIcon) {
    var pointsInMeters = [];
    var currentDistance = 0;
    var options = { units: 'kilometers' };

    var turfpoint1 = turf.point(start.slice().reverse());
    var turfpoint2 = turf.point(end.slice().reverse());
    var polyline1 = L.polyline([start, end], { color: 'black' }).addTo(layer);

    var bearing = turf.bearing(turfpoint1, turfpoint2);

    var turfnewpoint1 = turf.destination(turfpoint1, marker_lines.start_after, bearing, options);
    var newpoint1Marker = turfnewpoint1.geometry.coordinates.slice().reverse();

    var turfnewpoint2 = turf.destination(turfpoint2, -marker_lines.start_after, bearing, options);
    var newpoint2Marker = turfnewpoint2.geometry.coordinates.slice().reverse();

    var polyline2 = L.polyline([newpoint1Marker, newpoint2Marker], { color: marker_lines.color });

    var totalLineDistanceInMetre = kmToMeters(turf.distance(turfnewpoint1, turfnewpoint2, options));

    while (currentDistance <= totalLineDistanceInMetre) {
        var calcutedPoint = turf.destination(turfnewpoint1, metersToKilometers(currentDistance), bearing, options).geometry.coordinates.slice().reverse();
        pointsInMeters.push(calcutedPoint);
        currentDistance += marker_lines.distance;
    }

    for (var i = 0; i < pointsInMeters.length; i++) {
        if (i % 2 === 0) {
            // console.log(marker_lines.height)
            const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
            let x1 = L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // var m = L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            // markersx.push(m);
            var circle = L.circle(getLeafletCoords(leftpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);
            x1.on('click', function(e) {
              selectLayer(e.target);
           
              selectLayer(circle);


          });
          circle.on('click', function(e) {
            // selectLayer(e.target);
         
            selectLayer(e.target);


        });

        } else {
            const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
          let x1 =  L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // var m = L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
            // markersx.push(m);
            var circle = L.circle(getLeafletCoords(rightpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);

            x1.on('click', function(e) {
              selectLayer(e.target);
          });
          circle.on('click', function(e) {
            // selectLayer(e.target);
         
            selectLayer(e.target);


        });

        }
    }
}


// row - single - Anti personal up
function drawLineRow(start, end, marker_lines, layer, customIcon, top) {
  // console.log("------------------------")
  // console.log(start)
  // console.log(start)
  // console.log("------------------------")
    var pointsInMeters = [];
    var currentDistance = 0;
    var options = { units: 'kilometers' };

    var turfpoint1 = turf.point(start.slice().reverse());
    var turfpoint2 = turf.point(end.slice().reverse());
    var polyline1 = L.polyline([start, end], { color: 'black' }).addTo(layer);

    var bearing = turf.bearing(turfpoint1, turfpoint2);

    var turfnewpoint1 = turf.destination(turfpoint1, marker_lines.start_after, bearing, options);
    var newpoint1Marker = turfnewpoint1.geometry.coordinates.slice().reverse();

    var turfnewpoint2 = turf.destination(turfpoint2, -marker_lines.start_after, bearing, options);
    var newpoint2Marker = turfnewpoint2.geometry.coordinates.slice().reverse();

    var polyline2 = L.polyline([newpoint1Marker, newpoint2Marker], { color: marker_lines.color });

    var totalLineDistanceInMetre = kmToMeters(turf.distance(turfnewpoint1, turfnewpoint2, options));

    while (currentDistance <= totalLineDistanceInMetre) {
        var calcutedPoint = turf.destination(turfnewpoint1, metersToKilometers(currentDistance), bearing, options).geometry.coordinates.slice().reverse();
        pointsInMeters.push(calcutedPoint);
        currentDistance += marker_lines.distance;
    }
    if (top === true) {

    for (var i = 0; i < pointsInMeters.length; i++) {
      // console.log(pointsInMeters[i]);
        // if (i % 2 === 0) {
        //     // console.log(marker_lines.height)
        //     const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
        //     L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        //     L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
        // } else {
        //     // const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
        //     // L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        //     // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
        // }
            // // console.log(marker_lines.height)
            const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
            let x1 = L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            // const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
            // L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
            var circle = L.circle(getLeafletCoords(leftpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);
            x1.on('click', function(e) {
              selectLayer(e.target);
           
 

          });
          circle.on('click', function(e) {         
            selectLayer(e.target);


        });
    }
    } else {
    for (var i = 0; i < pointsInMeters.length; i++) {
      // console.log(pointsInMeters[i]);


           //     // console.log(marker_lines.height)
        //     const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
        //     L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        //     L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
        // } else {
        //     // const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
        //     // L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        //     // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
        // }
            // // console.log(marker_lines.height)
            // const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
            // L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            
            
            const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
            var x1 = L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
            var circle = L.circle(getLeafletCoords(rightpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);
            x1.on('click', function(e) {
              selectLayer(e.target);
           
 

          });
          circle.on('click', function(e) {         
            selectLayer(e.target);


        });
        
    }
    }
}

// Row  - double - anti personal 
function drawLineRowDouble(start, end, marker_lines, layer, customIcon, top) {
    var pointsInMeters = [];
    var currentDistance = 0;
    var options = { units: 'kilometers' };

    var turfpoint1 = turf.point(start.slice().reverse());
    var turfpoint2 = turf.point(end.slice().reverse());
    var polyline1 = L.polyline([start, end], { color: 'black' }).addTo(layer);

    var bearing = turf.bearing(turfpoint1, turfpoint2);

    var turfnewpoint1 = turf.destination(turfpoint1, marker_lines.start_after, bearing, options);
    var newpoint1Marker = turfnewpoint1.geometry.coordinates.slice().reverse();

    var turfnewpoint2 = turf.destination(turfpoint2, -marker_lines.start_after, bearing, options);
    var newpoint2Marker = turfnewpoint2.geometry.coordinates.slice().reverse();

    var polyline2 = L.polyline([newpoint1Marker, newpoint2Marker], { color: marker_lines.color });

    var totalLineDistanceInMetre = kmToMeters(turf.distance(turfnewpoint1, turfnewpoint2, options));
    // console.log("d1");

    while (currentDistance <= totalLineDistanceInMetre) {
        var calcutedPoint = turf.destination(turfnewpoint1, metersToKilometers(currentDistance), bearing, options).geometry.coordinates.slice().reverse();
        pointsInMeters.push(calcutedPoint);
        currentDistance += marker_lines.distance;
    }
    if (top === true) {

    for (var i = 0; i < pointsInMeters.length; i++) {
        if (i % 2 === 0) {
            // // console.log(marker_lines.height)
    // console.log("d2");

            const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[0]), bearing - 90);
    // console.log("d4");

          let x1 =   L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
    // console.log("d5");
            
            // L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            var circle = L.circle(getLeafletCoords(leftpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);
            x1.on('click', function(e) {
              selectLayer(e.target);
           
 

          });
          circle.on('click', function(e) {         
            selectLayer(e.target);


        });
    // console.log("d6");

        } else {
    // console.log("d3");

            const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[1]), bearing - 90);
            let x1 =    L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            var circle = L.circle(getLeafletCoords(leftpt), {
              color: marker_lines.color,
              fillColor: marker_lines.color,
              fillOpacity: 0.5,
              radius: 0.1
            }).addTo(layer);
            x1.on('click', function(e) {
              selectLayer(e.target);
           
 

          });
          circle.on('click', function(e) {         
            selectLayer(e.target);


        });
 
        }
            
    }
    } else {
    for (var i = 0; i < pointsInMeters.length; i++) {

      if (i % 2 === 0) {
    // console.log("d1");
    // console.log(pointsInMeters[i])

            const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[0]), bearing + 90);
            let x1 =  L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer); 
        var circle = L.circle(getLeafletCoords(rightpt), {
          color: marker_lines.color,
          fillColor: marker_lines.color,
          fillOpacity: 0.5,
          radius: 0.1
        }).addTo(layer);
        x1.on('click', function(e) {
          selectLayer(e.target);
       


      });
      circle.on('click', function(e) {         
        selectLayer(e.target);


    });
    } else {
    // console.log("d2");
    // console.log(pointsInMeters[i])

          const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[1]), bearing + 90);
          let x1 =  L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer); 
        var circle = L.circle(getLeafletCoords(rightpt), {
          color: marker_lines.color,
          fillColor: marker_lines.color,
          fillOpacity: 0.5,
          radius: 0.1
        }).addTo(layer);
        x1.on('click', function(e) {
          selectLayer(e.target);
       


      });
      circle.on('click', function(e) {         
        selectLayer(e.target);


    });

    
    }
  }

       
}
    }


      // Function to update the icon size of all markers based on the zoom level
      // function updateIconSizes() {
      //   var zoomLevel = map.getZoom();
      //   var newSize = 25 + (zoomLevel - 13) * 2; // Adjust the calculation as needed
      //   markersx.forEach(marker => {
      //     marker.setIcon(getCustomIcon(newSize));
      //   });
      // }

      // function getCustomIcon(size = 25) {
      //   return L.icon({
      //      iconSize: [size, size * 1.64], // maintain aspect ratio
      //     iconAnchor: [size / 2, size * 1.64], // adjust anchor point based on new size
      //     popupAnchor: [1, -size] // adjust popup anchor
      //   });
      // }
      // map.on('zoom', updateIconSizes);
      //  updateIconSizes();
  
  