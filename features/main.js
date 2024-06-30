// var editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

var selectedLayer = null;


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
    if (selectedLayer) {
        selectedLayer.setStyle({ color: 'blue' });
    }
    selectedLayer = layer;
    selectedLayer.setStyle({ color: 'red' });
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
            L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
        } else {
            const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
            L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
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
            L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
            // const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
            // L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            // L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
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
            L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
        
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

            L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
    // console.log("d5");
            
            L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
    // console.log("d6");

        } else {
    // console.log("d3");

            const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[1]), bearing - 90);
            L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
            L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
 
        }
            
    }
    } else {
    for (var i = 0; i < pointsInMeters.length; i++) {

      if (i % 2 === 0) {
    // console.log("d1");
    // console.log(pointsInMeters[i])

            const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[0]), bearing + 90);
        L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer); 
    } else {
    // console.log("d2");
    // console.log(pointsInMeters[i])

          const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height[1]), bearing + 90);
        L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
        L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer); 

    
    }
  }

       
}
    }
