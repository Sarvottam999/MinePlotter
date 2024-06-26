 
        // Initialize Leaflet map
        const ele = document.getElementById('container');
     
        // Initialize the FeatureGroup to store editable layers
        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        // Initialize the Leaflet.draw control
        var drawControl = new L.Control.Draw({
            draw: {
                // polyline: {
                //     shapeOptions: {
                //         color: 'blue',
                //         weight: 3,
                //         opacity: 0.7,
                //         dashArray: '10, 10'
                //     }
                // },
                polyline: false, // Disable default polyline to use custom dotted line polyline
                polygon: false,
                circle: false,
                circlemarker: false,
                marker: false,
                rectangle: false,
            },
            edit: {
                featureGroup: editableLayers,
                remove: true,
                poly: {
                    allowIntersection: false
                }
                // edit: true,

            }
        });
        map.addControl(drawControl);

        // Function to enable drawing mode for a dotted line polyline
        function enableDrawDottedLineMode() {
         
        }

     

      

        // Event listener for drawing a rectangle
        // document.getElementById('drawRectangle').onclick = function() {
        //     var rectangleDrawer = new L.Draw.Rectangle(map,{
        //         shapeOptions: {
        //             color: 'red'
        //         },
        //         showArea: true,
        //            metric: true,
        //             feet: false,
        //       });
        //     rectangleDrawer.enable();
        //     map.on('draw:drawstart', function(event) {
        //         console.log("drawstart")

        //         console.log(event)

        //          setTextH("Drawing of rectangle started.");
        //     });
        //     map.on('draw:drawstop', function(event) {
        //         console.log("drawstop")

        //         console.log(event)

        //          setTextH("Drawing of rectangle started.");
        //     }); 
        //     map.on('draw:drawvertex', function(event) {
        //         console.log("drawvertex")

        //         console.log(event)

        //          setTextH("Drawing of rectangle started.");
        //     });
            
         

        //     map.once('draw:created', function(event) {
        //         console.log("created")

        //         console.log(event)

        //         var layer = event.layer;
        //         editableLayers.addLayer(layer);
        //         rectangleDrawer.disable();
        //                         // // Calculate dimensions and display in info panel
        //         var bounds = layer.getBounds();
        //         var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
        //         var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
        //         document.getElementById('rectangle-dimensions').textContent = `Dimensions: ${width} m x ${height} m`;
                

        //     });
        //     map.on('draw:editstart', function(event) {
        //         // Perform actions when editing of rectangle starts
        //         // var layer = event.layer;
        //         console.log("editstart")

        //         console.log(event)
    
        //         setTextH("Editing of rectangle started.");
        //         // var bounds = layer.getBounds();
        //         // var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
        //         // var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
        //         // document.getElementById('rectangle-dimensions').textContent = `Dimensions: ${width} m x ${height} m`;
    
        //     });
        //     map.on('draw:editstop', function(event) {
        //         console.log(event)

        //         // Perform actions when editing of rectangle stops
        //         setTextH("Editing of rectangle stopped.");
        //     });
        // };

      
     

        // map.on('draw:drawstart', function(event) {
        //     // Perform actions when drawing of rectangle starts
        //     setTextH("Drawing of rectangle started.");
        //     var layer = event.layer;
          
        //                     // Calculate dimensions and display in info panel
        //                     var bounds = layer.getBounds();
        //                     var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
        //                     var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
        //                     document.getElementById('rectangle-dimensions').textContent = `Dimensions: ${width} m x ${height} m`;
            
        // });
        

        function setTextH(text) {
    ele.textContent = text;
}



// ==============
// Coordinates for the bottom-left corner of the rectangle
// var bottomLeft = [50.5, 30.5];

// // Function to calculate new coordinates given a start point, distance, and bearing
// function destinationPoint(lat, lon, distance, bearing) {
//     console.log("runned");
//     var R = 6378137; // Radius of the Earth in meters
//     var brng = bearing * Math.PI / 180; // Convert bearing to radians
//     var d = distance; // Distance in meters

//     var lat1 = lat * Math.PI / 180; // Current lat point converted to radians
//     var lon1 = lon * Math.PI / 180; // Current lon point converted to radians

//     var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) +
//             Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));

//     var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1),
//                     Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2));

//     return [lat2 * 180 / 360, lon2 * 180 / 360]; // Convert back to degrees
// }

// // Calculate the coordinates for the other corners of the rectangle
// var bottomRight = destinationPoint(bottomLeft[0], bottomLeft[1], 10, 90);
// var topRight = destinationPoint(bottomRight[0], bottomRight[1], 10, 0);
// var topLeft = destinationPoint(bottomLeft[0], bottomLeft[1], 10, 0);
// console.log(bottomLeft)
// console.log(bottomRight)
// console.log(topLeft)


// // Create the rectangle using the coordinates
// var bounds = [bottomLeft, topLeft, topRight, bottomRight];

// var rec = L.polygon(bounds, {color: 'blue'});
// editableLayers.addLayer(rec);

// var point = turf.point([-75.343, 39.984]);
// console.log(point)

// var distance = 50;
// var bearing = 90;
// var options = { units: "miles" };

// var destination = turf.destination(point, distance, bearing, options);



 var onelatLng = L.latLng(51.505, -0.09);
// L.marker(onelatLng).addTo(map)
//     .bindPopup('1')
//     .openPopup();
        // ------------------------

// document.getElementById('drawRectangle2').onclick = function() {

// var w = parseFloat(document.getElementById('width').value);
// var h = parseFloat(document.getElementById('height').value);
// var textlabel = (document.getElementById('textlabel').value);


 

// drawSquareByInput(onelatLng, h, w , textlabel)

// }

        // function drawSquareByInput(start, h, w ) {
        //     // starta : leaflet 
        //     // legth :length;

        //     var options = { units: 'meters' };
        //     let arr = [];
        //     arr.push([start.lng, start.lat])

        //     var bottomLeftPoint = turf.point([start.lng, start.lat]);

        //         // // Calculate bottom right corner
        //         var bottomRightPoint = turf.destination(bottomLeftPoint, w, 90, options);
        //         var bottomRight = bottomRightPoint.geometry.coordinates;
        //         arr.push(bottomRight)
        //         // console.log(bottomRight)
        //         // L.marker([bottomRight[1],bottomRight[0] ]).addTo(map)
        //         //     .bindPopup('2')
        //         //     .openPopup();

        //         // var bottomLeftPoint = turf.point([bottomRight.lng, bottomRight.lat]);
        //             var toprightPoint = turf.destination(bottomRightPoint, h, 0, options);
        //         var topright = toprightPoint.geometry.coordinates;
        //         arr.push(topright)

        //         // console.log(bottomRight)
        //         // L.marker([topright[1],topright[0] ]).addTo(map)
        //         //     .bindPopup('3')
        //         //     .openPopup();

        //             var topleftpont = turf.destination(toprightPoint, w, -90, options);
        //             var topleft = topleftpont.geometry.coordinates;
        //         arr.push(topleft)
                    
        //             // console.log(bottomRight)
        //             // L.marker([topleft[1],topleft[0] ]).addTo(map)
        //             //     .bindPopup('4')
        //             //     .openPopup();




        //                 var bottumleftpont = turf.destination(topleftpont, h, 180, options);
        //                 var bottumleft = bottumleftpont.geometry.coordinates;
        //             arr.push(bottumleft)
                        
        //                 // console.log(bottomRight)
        //                 // L.marker([topleft[1],topleft[0] ]).addTo(map)
        //                 //     .bindPopup('4')
        //                 //     .openPopup();

        //                 drawRectangle(arr)



            
        // }

        // function drawSquareByInput(start, h, w, text) {
        //     // start : leaflet LatLng object (starting point)
        //     // h : height in meters
        //     // w : width in meters
        //     // text: the text to display over the rectangle
        
        //     var options = { units: 'meters' };
        //     let arr = [];
        //     arr.push([start.lng, start.lat]);
        
        //     var bottomLeftPoint = turf.point([start.lng, start.lat]);
        
        //     // Calculate bottom right corner
        //     var bottomRightPoint = turf.destination(bottomLeftPoint, w, 90, options);
        //     var bottomRight = bottomRightPoint.geometry.coordinates;
        //     arr.push(bottomRight);
        
        //     // Calculate top right corner
        //     var toprightPoint = turf.destination(bottomRightPoint, h, 0, options);
        //     var topright = toprightPoint.geometry.coordinates;
        //     arr.push(topright);
        
        //     // Calculate top left corner
        //     var topleftpont = turf.destination(toprightPoint, w, -90, options);
        //     var topleft = topleftpont.geometry.coordinates;
        //     arr.push(topleft);
        
        //     // Close the rectangle
        //     var bottumleftpont = turf.destination(topleftpont, h, 180, options);
        //     var bottumleft = bottumleftpont.geometry.coordinates;
        //     arr.push(bottumleft);
        
        //     // Draw the rectangle
        //     drawRectangle(arr);
        
        //     // Create and add the text label to the map
        //     var latLngBounds = [
        //         [start.lat, start.lng],
        //         [topright[1], topright[0]]
        //     ];
        //     var bounds = L.latLngBounds(latLngBounds);
        //     var labelIcon = L.divIcon({
        //         className: 'label-icon',
        //         html: text,
        //         iconSize: [100, 40]
        //     });
        //     var labelMarker = L.marker(bounds.getCenter(), { icon: labelIcon });
        //     editableLayers.addLayer(labelMarker);
        // }

        // function drawPolyline(coordinates) {
        //     // Create a polyline using the coordinates array
        //     var latLngPoints = turfPointsToLatLng(coordinates);

        //     var polyline = L.polyline(latLngPoints, {color: 'blue'})
        //     editableLayers.addLayer(polyline);
        //     // map.on('draw:editstart', function(event) {
        //     //     console.log(event)

        //     //     // Perform actions when editing of rectangle stops
        //     //     setTextH("Editing of rectangle stopped.");
        //     // });

        
        //     // Zoom the map to the polyline
        //     map.fitBounds(polyline.getBounds());
        // }
        // function drawRectangle(coordinates) {
        //     map.on('draw:editstart', function(event) {
        //         console.log(event)

        //         // Perform actions when editing of rectangle stops
        //         setTextH("Editing of rectangle editstart.");
        //     });

        //     map.on('draw:editstop', function(event) {
        //         console.log(event)

        //         // Perform actions when editing of rectangle stops
        //         setTextH("Editing of rectangle editstop.");
        //     });
        //     // Ensure coordinates are in the correct format
        //     var latLngPoints = turfPointsToLatLng(coordinates);
        
        //     // Create a rectangle using the coordinates array
        //     var bounds = L.latLngBounds(latLngPoints);
        
        //     var rectangle = L.rectangle(bounds, {color: 'blue'});
        //     editableLayers.addLayer(rectangle);
        
        //     // Zoom the map to the rectangle
        //     map.fitBounds(rectangle.getBounds());
        // }

        // function turfPointsToLatLng(turfPoints) {
        //     return turfPoints.map(function(point) {
        //         return [point[1], point[0]]; // Turf.js uses [lng, lat] while Leaflet uses [lat, lng]
        //     });
        // }
        

        // ------------------------
        
// // Calculate top right corner
// var topRightPoint = turf.destination(bottomRightPoint, widthMeters, 0, options);
// var topRight = topRightPoint.geometry.coordinates;


// // Calculate top left corner
// var topLeftPoint = turf.destination(bottomLeftPoint, widthMeters, 0, options);
// var topLeft = topLeftPoint.geometry.coordinates;

// // Create the rectangle using the coordinates
// var bounds = [bottomLeft, bottomRight, topRight, topLeft, bottomLeft];

// L.polygon(bounds, {color: 'blue'}).addTo(map);

// }



// var point = turf.point([-75.343, 39.984]); // Example Turf.js point
// var latLng = turfPointToLatLng(point);



// function turfPointToLatLng(turfPoint) {
//     // Extract the coordinates from the Turf.js point
//     var coordinates = turfPoint.geometry.coordinates;
//     // Create a new Leaflet LatLng object using the coordinates
//     var latLng = new L.LatLng(coordinates[1], coordinates[0]);
//     return latLng;
// }

// Create a Leaflet LatLng object
// var latLng = L.latLng(40.7128, -74.0060);

// // Convert the LatLng object to a Turf.js point
// var turfPoint = latLngToTurfPoint(latLng);

// Function to convert Leaflet LatLng to Turf.js point
function latLngToTurfPoint(latLng) {
    // Extract the latitude and longitude from the Leaflet LatLng object
    var lat = latLng.lat;
    var lng = latLng.lng;

    // Create a Turf.js point using the coordinates
    var turfPoint = turf.point([lng, lat]);

    return turfPoint;
}
//  

