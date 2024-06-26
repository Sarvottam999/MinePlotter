
// const ele = document.getElementById('conatiner');

// const newDiv = document.createElement('div-1');
// // newDiv.innerHTML = `

// var customIcon = L.icon({
//     iconUrl: './icon25/square.png',
//     iconSize: [32, 32], // size of the icon
//     iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
//   });
//   var Myicons = [
//     L.icon({
//       iconUrl: './icon25/iconred1.png',
//       iconSize: [15, 15],
//       // iconAnchor: [10, 32],
//     }),
//     L.icon({
//       iconUrl: './icon25/icongreen2.png',
//       iconSize: [15, 15],
//       // iconAnchor: [10, 32],
//     }),
//     L.icon({
//       iconUrl: './icon25/iconblue3.png',
//       iconSize: [15, 15],
//       // iconAnchor: [16, 32],
//     })]
  
//   L.Draw.CustomLine = L.Draw.Feature.extend({
//     statics: {
//         TYPE: 'customLine'
//     },
//     initialize: function (map, options) {
//         setTextH("initialize")

//         this.type = L.Draw.CustomLine.TYPE;
//         L.Draw.Feature.prototype.initialize.call(this, map, options);
//     },
//     // 
//     addHooks: function () {
//         setTextH("addHook")

//         L.Draw.Feature.prototype.addHooks.call(this);
//         if (this._map) {
//             this._mapDraggable = this._map.dragging.enabled();
//             this._map.dragging.disable();

//             this._startPoint = null;
//             this._endPoint = null;

//             this._map.on('mousemove', this._onMouseMove, this);
//             this._map.on('click', this._onClick, this);
//         }
//     },
//     removeHooks: function () {
//         setTextH("removeHooks")

//         L.Draw.Feature.prototype.removeHooks.call(this);
//         if (this._map) {
//             this._map.dragging.enable();

//             this._map.off('mousemove', this._onMouseMove, this);
//             this._map.off('click', this._onClick, this);

//             if (this._line) {
//                 this._map.removeLayer(this._line);
//                 delete this._line;
//             }

//             this._container.style.cursor = '';
//         }
//     },
//     _onMouseMove: function (e) {
//         setTextH("_onMouseMove")


//         if (!this._startPoint) {
//             return;
//         }

//         this._endPoint = e.latlng;

//         if (this._line) {
//             this._map.removeLayer(this._line);
//         }

//         this._line = L.polyline([this._startPoint, this._endPoint], { color: 'black' }).addTo(this._map);
//     },
//     _onClick: function (e) {
//         setTextH("_onClick")

//         if (!this._startPoint) {
//             this._startPoint = e.latlng;
//         } else {
//             this._endPoint = e.latlng;

//             // Call your custom drawLine function
//             drawLine(this._startPoint, this._endPoint, { start_after: 0.003, color: 'red', distance: 3, height: 150 }, this._map, Myicons[0]);

//             // Finish drawing
//             this.disable();

        
//         }
//     }
// });














// L.DrawToolbar.include({
//     getModeHandlers: function (map) {
//         return [
//             {
//                 enabled: this.options.polyline,
//                 handler: new L.Draw.Polyline(map, this.options.polyline),
//                 title: L.drawLocal.draw.toolbar.buttons.polyline
//             },
//             {
//                 enabled: this.options.polygon,
//                 handler: new L.Draw.Polygon(map, this.options.polygon),
//                 title: L.drawLocal.draw.toolbar.buttons.polygon
//             },
//             {
//                 enabled: this.options.rectangle,
//                 handler: new L.Draw.Rectangle(map, this.options.rectangle),
//                 title: L.drawLocal.draw.toolbar.buttons.rectangle
//             },
//             {
//                 enabled: this.options.circle,
//                 handler: new L.Draw.Circle(map, this.options.circle),
//                 title: L.drawLocal.draw.toolbar.buttons.circle
//             },
//             {
//                 enabled: this.options.marker,
//                 handler: new L.Draw.Marker(map, this.options.marker),
//                 title: L.drawLocal.draw.toolbar.buttons.marker
//             },
//             {
//                 enabled: this.options.customLine,
//                 handler: new L.Draw.CustomLine(map, this.options.customLine),
//                 title: 'Draw a custom line!'
//             }
//         ];
//     }
// });







 
//         // Custom drawLine function
//         function drawLine(start, end, marker_lines, layer, customIcon) {
//             var pointsInMeters = [];
//             var currentDistance = 0;
//             var options = { units: 'kilometers' };
//             console.log(start)

//             var turfpoint1 = turf.point(Object.values(start).slice().reverse());
//             var turfpoint2 = turf.point(Object.values(end).slice().reverse());
//             var polyline1 = L.polyline([start, end], { color: 'black' }).addTo(layer);

//             var bearing = turf.bearing(turfpoint1, turfpoint2);

//             var turfnewpoint1 = turf.destination(turfpoint1, marker_lines.start_after, bearing, options);
//             var newpoint1Marker = turfnewpoint1.geometry.coordinates.slice().reverse();

//             var turfnewpoint2 = turf.destination(turfpoint2, -marker_lines.start_after, bearing, options);
//             var newpoint2Marker = turfnewpoint2.geometry.coordinates.slice().reverse();

//             var polyline2 = L.polyline([newpoint1Marker, newpoint2Marker], { color: marker_lines.color }).addTo(layer);

//             var totalLineDistanceInMetre = kmToMeters(turf.distance(turfnewpoint1, turfnewpoint2, options));

//             console.log(totalLineDistanceInMetre);

//             while (currentDistance <= totalLineDistanceInMetre) {
//                 var calcutedPoint = turf.destination(turfnewpoint1, metersToKilometers(currentDistance), bearing, options).geometry.coordinates.slice().reverse();
//                 pointsInMeters.push(calcutedPoint);
//                 currentDistance += marker_lines.distance;
//             }

//             for (var i = 0; i < pointsInMeters.length; i++) {
//                 if (i % 2 === 0) {
//                     const leftpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing - 90);
//                     L.polyline([pointsInMeters[i], getLeafletCoords(leftpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
//                     var marker = L.marker(getLeafletCoords(leftpt), { icon: customIcon }).addTo(layer);
//                 } else {
//                     const rightpt = turf.rhumbDestination(pointsToTurf(pointsInMeters[i]), cmToKm(marker_lines.height), bearing + 90);
//                     L.polyline([pointsInMeters[i], getLeafletCoords(rightpt)]).setStyle({ color: marker_lines.color, weight: 5 }).addTo(layer);
//                     var marker = L.marker(getLeafletCoords(rightpt), { icon: customIcon }).addTo(layer);
//                 }
//             }
//         }

//         function kmToMeters(km) {
//             return km * 1000;
//         }

//         function metersToKilometers(m) {
//             return m / 1000;
//         }

//         function cmToKm(cm) {
//             return cm / 100000;
//         }

//         function pointsToTurf(point) {
//             return turf.point(point.slice().reverse());
//         }

//         function getLeafletCoords(turfPoint) {
//             return turfPoint.geometry.coordinates.slice().reverse();
//         }

  
//         var drawnItems = new L.FeatureGroup();
//         map.addLayer(drawnItems);

//         var drawControl = new L.Control.Draw({
//             edit: {
//                 featureGroup: drawnItems
//             },
//             draw: {
//                 polyline: false,
//                 polygon: false,
//                 circle: false,
//                 circlemarker: false,
//                 marker: false,
//                 customLine: {
//                     title: 'Draw a custom line!',
//                     // shapeOptions: {
//                     //     color: 'blue'
//                     // }
//                 }
//             }
//         });
//         map.addControl(drawControl);

//         map.on('draw:created', function (e) {
//             var layer = e.layer;
//             drawnItems.addLayer(layer);
//         });
 

















//        function setTextH(t){
//             var text = document.createTextNode(t);
        
//             ele.appendChild(text);
//         }
        



// // var drawnItems = new L.FeatureGroup();
// // map.addLayer(drawnItems);

// // // Custom Shape Handler
// // L.Draw.CustomShape = L.Draw.SimpleShape.extend({
// //     statics: {
// //         TYPE: 'customShape'
// //     },
// //     options: {
// //         shapeOptions: {
// //             stroke: true,
// //             color: '#3388ff',
// //             weight: 4,
// //             opacity: 0.5,
// //             fill: true,
// //             fillColor: null,
// //             fillOpacity: 0.2,
// //             clickable: true
// //         }
// //     },
// //     initialize: function (map, options) {
// //         this.type = L.Draw.CustomShape.TYPE;
// //         L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
// //     },
// //     _drawShape: function (latlng) {
// //         if (!this._shape) {
// //             this._shape = L.circle(latlng, this.options.shapeOptions);
// //             this._map.addLayer(this._shape);
// //         } else {
// //             var radius = this._startLatLng.distanceTo(latlng);
// //             this._shape.setRadius(radius);
// //         }
// //     },
// //     _fireCreatedEvent: function () {
// //         var customShape = L.circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
// //         L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, customShape);
// //     }
// // });

// // var drawControl = new L.Control.Draw({
// //     edit: {
// //         featureGroup: drawnItems
// //     },
// //     draw: {
// //         // customShape: {
// //         //     title: 'Draw a custom shape!',
// //         //     shapeOptions: {
// //         //         color: '#3388ff'
// //         //     }
// //         // },
// //         // polygon: {
// //         //     shapeOptions: {
// //         //         color: 'purple'
// //         //     },
// //         //     allowIntersection: false,
// //         //     drawError: {
// //         //         color: 'orange',
// //         //         timeout: 1000
// //         //     },
// //         //     showArea: true,
// //         //     metric: true
// //         // },
// //         rectangle: {
// //             shapeOptions: {
// //                 color: 'blue'
// //             },
// //             showArea: true,
// //             metric: true
// //         },
// //         polyline: {
// //             shapeOptions: {
// //                 color: 'red'
// //             },
// //             metric: true
// //         }
// //     }
// // });
// // map.addControl(drawControl);

// // map.on(L.Draw.Event.CREATED, function (e) {
// //     var type = e.layerType,
// //         layer = e.layer;

// //     drawnItems.addLayer(layer);
// // });

// // // Add Custom Shape to Draw Control
// // L.DrawToolbar.include({
// //     getModeHandlers: function (map) {
// //         return [
// //             {
// //                 enabled: this.options.polyline,
// //                 handler: new L.Draw.Polyline(map, this.options.polyline),
// //                 title: L.drawLocal.draw.toolbar.buttons.polyline
// //             },
// //             {
// //                 enabled: this.options.polygon,
// //                 handler: new L.Draw.Polygon(map, this.options.polygon),
// //                 title: L.drawLocal.draw.toolbar.buttons.polygon
// //             },
// //             {
// //                 enabled: this.options.rectangle,
// //                 handler: new L.Draw.Rectangle(map, this.options.rectangle),
// //                 title: L.drawLocal.draw.toolbar.buttons.rectangle
// //             },
// //             {
// //                 enabled: this.options.circle,
// //                 handler: new L.Draw.Circle(map, this.options.circle),
// //                 title: L.drawLocal.draw.toolbar.buttons.circle
// //             },
// //             {
// //                 enabled: this.options.marker,
// //                 handler: new L.Draw.Marker(map, this.options.marker),
// //                 title: L.drawLocal.draw.toolbar.buttons.marker
// //             },
// //             {
// //                 enabled: this.options.customShape,
// //                 handler: new L.Draw.CustomShape(map, this.options.customShape),
// //                 title: 'Draw a custom shape!'
// //             }
// //         ];
// //     }
// // });

// // var currentCoordinates = document.getElementById('current-coordinates');
// // var currentMeasurement = document.getElementById('current-measurement');

// // map.on('mousemove', function (e) {
// //     currentCoordinates.textContent = `lat: ${e.latlng.lat.toFixed(6)}, lng: ${e.latlng.lng.toFixed(6)}`;
// // });