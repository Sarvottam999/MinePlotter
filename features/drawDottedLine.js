 
 function calculateAndShowPopup(layer) {
    var latlngs = layer.getLatLngs();
    if (latlngs.length > 1) {
        var from = turf.point([latlngs[0].lng, latlngs[0].lat]);
        var to = turf.point([latlngs[1].lng, latlngs[1].lat]);
        var options = { units: 'meters' };
        var distance = turf.distance(from, to, options).toFixed(2);
        var bearing = turf.bearing(from, to).toFixed(2);

        // Calculate midpoint for placing the popup
        var midpoint = turf.midpoint(from, to);
        var midpointLatLng = [midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]];

        // Create popup content
        var popupContent = 'Distance: ' + distance + ' meters<br>Bearing: ' + bearing + ' degrees';

        // Open popup on the map
        L.popup()
            .setLatLng(midpointLatLng)
            .setContent(popupContent)
            .openOn(map);

        // Attach click event to the layer to show the popup
        layer.on('click', function(e) {
                        selectLayer(e.target);

            L.popup()
                .setLatLng(midpointLatLng)
                .setContent(popupContent)
                .openOn(map);
        });

        
    }
}

 

map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    editableLayers.addLayer(layer);
    calculateAndShowPopup(layer);
});

map.on('draw:edited', function(event) {
    var layers = event.layers;
    layers.eachLayer(function(layer) {
        calculateAndShowPopup(layer);
    });
});
 
document.getElementById('drawDottedLine').onclick = function() {
    var dottedLineDrawer = new L.Draw.Polyline(map, {
        shapeOptions: {
            color: 'blue',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10'
        }
    });

    dottedLineDrawer.enable();
};




 
//   -----------------------------------------------------
        // function enableDrawDottedLineMode() {
        //     var dottedLineDrawer = new L.Draw.Polyline(map, {
        //         shapeOptions: {
        //             color: 'blue',
        //             weight: 3,
        //             opacity: 0.7,
        //             dashArray: '10, 10'
        //         }
        //     });

        //     dottedLineDrawer.enable();

        //     map.once('draw:created', function(event) {
        //         var layer = event.layer;
        //         editableLayers.addLayer(layer);

        //         var latlngs = layer.getLatLngs();
        //         if (latlngs.length > 1) {
        //             var from = turf.point([latlngs[0].lng, latlngs[0].lat]);
        //             var to = turf.point([latlngs[1].lng, latlngs[1].lat]);
        //             var options = { units: 'meters' };
        //             var distance = turf.distance(from, to, options).toFixed(2);
        //             var bearing = turf.bearing(from, to).toFixed(2);

        //             // Calculate midpoint for placing the popup
        //             var midpoint = turf.midpoint(from, to);
        //             var midpointLatLng = [midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]];

        //             // Create popup content
        //             var popupContent = 'Distance: ' + distance + ' meters<br>Bearing: ' + bearing + ' degrees';

        //             // Add click event to the layer
        //             layer.on('click', function() {
        //                 L.popup()
        //                     .setLatLng(midpointLatLng)
        //                     .setContent(popupContent)
        //                     .openOn(map);
        //             });
        //         }

        //         dottedLineDrawer.disable();
        //         layer.on('click', function(e) {
        //             selectLayer(e.target);
        //         });
        //     });
        // }


        // document.getElementById('drawDottedLine').onclick = function() {

        //     enableDrawDottedLineMode();
        // };
// --------------------------
        // function selectLayer(layer) {
        //     // Logic to select a layer
        //     // You can implement your own selection logic here
        //     console.log('Layer selected:', layer);
        // }
 

// Event listener for drawing a dotted line polyline
//    document.getElementById('drawDottedLine').onclick = function() {
//     enableDrawDottedLineMode();
//     var dottedLineDrawer = new L.Draw.Polyline(map, {
//         shapeOptions: {
//             color: 'blue',
//             weight: 3,
//             opacity: 0.7,
//             dashArray: '10, 10' // Define your desired dash pattern here
//         },

//     });
//      dottedLineDrawer.enable();
 


//     map.once('draw:created', function(event) {
//         var layer = event.layer;
//         editableLayers.addLayer(layer);
//         dottedLineDrawer.disable();
//         layer.on('click', function(e) {
//             selectLayer(e.target);

            
//         });
//     });
// };