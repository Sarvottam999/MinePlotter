// Initialize the map
// var map = L.map('map').setView([0, 0], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// Initialize the Leaflet.draw plugin
// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);

// var drawControl = new L.Control.Draw({
//     draw: {
//         polyline: {
//             shapeOptions: {
//                 color: 'red'
//             },
//             showLength: true,
 
//         },
//         polygon: false,
//         rectangle: false,
//         circle: true,
//         marker: false,
//     },
//     edit: {
//         featureGroup: drawnItems
//     }
// });
// map.addControl(drawControl);

// // Handle the draw:created event
// map.on('draw:created', function(e) {
//     var type = e.layerType,
//         layer = e.layer;

//     if (type === 'polyline') {
//         // Create a popup and attach it to the polyline
//         var popup = L.popup()
//             // .setLatLng(layer.getLatLsngs()[0])
//             .setContent('Length: ' + layer.getLength().toFixed(2) + ' meters  hellooooo')
//             .openOn(map);
//             console.log('Length: ' + layer.getLength().toFixed(2) + ' meters  hellooooo')

//         // Add the polyline and popup to the map
//         drawnItems.addLayer(layer);
//     }
// });

// -------------------------- mesurement in km 


// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);

// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems
//     },
//     draw: {
//         polygon: {
//             shapeOptions: {
//                 color: 'purple'
//             },
//             allowIntersection: false,
//             drawError: {
//                 color: 'orange',
//                 timeout: 1000
//             },
//             showArea: true,
//             metric: true // Set to true to display measurements in meters
//         },
//         rectangle: {
//             shapeOptions: {
//                 color: 'blue'
//             },
//             showArea: true,
//             metric: true // Set to true to display measurements in meters
//         }
//     }

 // });
// map.addControl(drawControl);

// function enableDrawSquareMode() {
//     var squareDrawer = new L.Draw.Rectangle(map, {
//         shapeOptions: {
//             color: 'blue'
//         }
//     });
//     squareDrawer.enable();

//     var popup = L.popup();

//     map.on('draw:drawstart', function () {
//         map.on('mousemove', function(e) {
//             if (squareDrawer._shape) {
//                 var bounds = squareDrawer._shape.getBounds();
//                 var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
//                 var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
//                 var center = bounds.getCenter();
//                 popup
//                     .setLatLng(center)
//                     .setContent(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`)
//                     .openOn(map);
//             }
//         });
//     });

//     map.once('draw:drawstop', function () {
//         map.off('mousemove');
//         popup.removeFrom(map);
//     });

//     map.once('draw:created', function(event) {
//         var layer = event.layer;
//         drawnItems.addLayer(layer);
//         var bounds = layer.getBounds();
//         var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
//         var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
//         var center = bounds.getCenter();
//         layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`).openPopup();
//     });

//     map.on('draw:edited', function (e) {
//         var layers = e.layers;
//         layers.eachLayer(function (layer) {
//             if (layer instanceof L.Rectangle) {
//                 var bounds = layer.getBounds();
//                 var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
//                 var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
//                 var center = bounds.getCenter();
//                 layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`);
//             }
//         });
//     });
// }

// // Enable draw square mode when a button is clicked
// document.getElementById('drawSquareButton').addEventListener('click', enableDrawSquareMode);


// ======================= custom pop up 
const ele = document.getElementById('conatiner');

const newDiv = document.createElement('div-1');
// newDiv.innerHTML = `
//     <h2>Hey Geek,<br/> Welcome to GeeksforGeeks!!</h2>
//     <h3>This is the HTML appended using the appendChild() method in JavaScript.</h3>
// `;
ele.appendChild(newDiv);

// Initialize the Leaflet.draw plugin
var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            },
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'purple'
                    },
                    allowIntersection: false,
                    drawError: {
                        color: 'orange',
                        timeout: 1000
                    },
                    showArea: true,
                    metric: true // Set to true to display measurements in meters
                },
                rectangle: {
                    shapeOptions: {
                        color: 'blue'
                    },
                    showArea: true,
                    metric: true // Set to true to display measurements in meters
                },
                polyline: {
                    shapeOptions: {
                        color: 'red'
                    },
                    metric: true // Set to true to display measurements in meters
                }
            }
        });
        map.addControl(drawControl);

        var currentCoordinates = document.getElementById('current-coordinates');
        var currentMeasurement = document.getElementById('current-measurement');

        function enableDrawSquareMode() {
            var squareDrawer = new L.Draw.Rectangle(map, {
                shapeOptions: {
                    color: 'blue'
                }
            });
            squareDrawer.enable();

            var popup = L.popup();

            map.on('draw:drawstart', function () {
                newDiv.innerHTML =`drawstart`

                map.on('mousemove', function(e) {
                    currentCoordinates.textContent = `lat: ${e.latlng.lat.toFixed(6)}, lng: ${e.latlng.lng.toFixed(6)}`;
                    if (squareDrawer._shape) {
                newDiv.innerHTML =squareDrawer._shape;
                        
                        var bounds = squareDrawer._shape.getBounds();
                        var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
                        var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
                        var center = bounds.getCenter();
                        // var center = bounds.getSouth();

                        popup
                            .setLatLng(center)
                            .setContent(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`)
                            .openOn(map);
                        currentMeasurement.textContent = `${width} m x ${height} m`;
                    }
                });
            });

            map.once('draw:drawstop', function () {
                map.off('mousemove');
                popup.removeFrom(map);
                currentMeasurement.textContent = '';
            });

            map.once('draw:created', function(event) {
                newDiv.innerHTML =`created`
                var layer = event.layer;
                drawnItems.addLayer(layer);
                var bounds = layer.getBounds();
                var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
                var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
                var center = bounds.getCenter();
                layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`).openPopup();
                currentMeasurement.textContent = `${width} m x ${height} m`;
            });

            map.on('draw:edited', function (e) {
                newDiv.innerHTML =`edited`

                var layers = e.layers;
                layers.eachLayer(function (layer) {
                    if (layer instanceof L.Rectangle) {
                        var bounds = layer.getBounds();
                        var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
                        var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
                        var center = bounds.getCenter();
                        layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`);
                        currentMeasurement.textContent = `${width} m x ${height} m`;
                    }
                });
            });
        }

        // Enable draw square mode when a button is clicked
        enableDrawSquareMode();

        // Example to enable polyline drawing and show measurement
        function enableDrawPolylineMode() {
            var polylineDrawer = new L.Draw.Polyline(map, {
                shapeOptions: {
                    color: 'red'
                }
            });
            polylineDrawer.enable();

            map.on('draw:drawvertex', function (e) {
                var latlngs = e.layers.toGeoJSON().geometry.coordinates;
                var totalDistance = 0;
                for (var i = 0; i < latlngs.length - 1; i++) {
                    var latlng1 = L.latLng(latlngs[i][1], latlngs[i][0]);
                    var latlng2 = L.latLng(latlngs[i + 1][1], latlngs[i + 1][0]);
                    totalDistance += map.distance(latlng1, latlng2);
                }
                currentMeasurement.textContent = `Length: ${totalDistance.toFixed(2)} m`;
            });

            map.once('draw:drawstop', function () {
                newDiv.innerHTML =`drawstop`

                map.off('draw:drawvertex');
                currentMeasurement.textContent = '';
            });
        }