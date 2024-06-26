  // Get the container element by ID
  const ele = document.getElementById('container');

  // Initialize the FeatureGroup to store editable layers
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  // Initialize the Leaflet.draw control
  var drawControl = new L.Control.Draw({
      draw: {
          polyline: true,
          polygon: true,
          circle: true,
          circlemarker: false,
          marker: false,
          rectangle: true,
      },
      edit: {
          featureGroup: editableLayers,
          remove: true
      }
  });
  map.addControl(drawControl);

  // Get other elements by ID
  var currentCoordinates = document.getElementById('current-coordinates');
  var polylineLength = document.getElementById('polyline-length');
  var stopEditingButton = document.getElementById('stop-editing');
  var deleteObjectButton = document.getElementById('delete-object');

  var currentShape;
  var isDeleteMode = false;

  // Event listener for when a new vertex is added (during drawing)
  map.on("draw:drawvertex", function (event) {  //L.Draw.Event.DRAWVERTEX
    console.log("drawing...")
      var layers = event.layers;
      layers.eachLayer(function(layer) {
          if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Circle || layer instanceof L.Rectangle) {
              currentShape = layer;
              updateInfo();
          }
      });
  });

  // Event listener for when a polyline, polygon, circle, or rectangle is created (finish drawing)
  map.on(L.Draw.Event.CREATED, function (event) {
      setTextH("Finish drawing");
      var layer = event.layer;
      if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Circle || layer instanceof L.Rectangle) {
          editableLayers.addLayer(layer);
          layer.on('click', function () {
              if (isDeleteMode) {
                  editableLayers.removeLayer(layer);
              } else {
                  enableEdit(layer);
              }
          });
      }
      currentShape = null; // Reset current shape after drawing is finished
      updateInfo();
  });

  // Event listener for when a polyline, polygon, circle, or rectangle is edited
  map.on('draw:editvertex', function (event) {
      currentShape = event.layers.getLayers()[0];
      updateInfo();
  });

  // Function to update the information panel with current shape data
  function updateInfo() {
      if (currentShape) {
          var latlngs = currentShape.getLatLngs ? currentShape.getLatLngs() : currentShape.getLatLng();
          var length = calculateLength(latlngs);
          var coordinatesText = Array.isArray(latlngs) ? latlngs.map(function (latlng) {
              if (Array.isArray(latlng)) {
                  return latlng.map(function (coord) {
                      return `[${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)}]`;
                  }).join(', ');
              } else {
                  return `[${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}]`;
              }
          }).join(', ') : `[${latlngs.lat.toFixed(4)}, ${latlngs.lng.toFixed(4)}]`;

          currentCoordinates.textContent = "Coordinates: " + coordinatesText;
          polylineLength.textContent = "Length: " + length.toFixed(2) + ' meters';
      } else {
          currentCoordinates.textContent = '';
          polylineLength.textContent = '';
      }
  }

  // Function to calculate the length of a polyline or perimeter of a polygon in meters
  function calculateLength(latlngs) {
      var totalLength = 0;
      if (Array.isArray(latlngs[0])) {
          // For polygons, latlngs is an array of arrays
          latlngs = latlngs[0];
      }
      for (var i = 1; i < latlngs.length; i++) {
          totalLength += latlngs[i - 1].distanceTo(latlngs[i]);
      }
      if (currentShape instanceof L.Polygon) {
          // Close the polygon
          totalLength += latlngs[latlngs.length - 1].distanceTo(latlngs[0]);
      }
      return totalLength;
  }

  // Function to set text content of the container element
  function setTextH(text) {
      ele.textContent = text;
  }

  // Adding a custom control for the ruler
  L.Control.Ruler = L.Control.extend({
      onAdd: function(map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          var link = L.DomUtil.create('a', '', container);
          link.href = '#';
          link.title = 'Measure distance';
          link.innerHTML = 'Ruler';

          L.DomEvent.on(link, 'click', function(e) {
              e.preventDefault();
              startRulerTool();
          });

          return container;
      }
  });

  L.control.ruler = function(opts) {
      return new L.Control.Ruler(opts);
  }

  L.control.ruler({ position: 'topright' }).addTo(map);

  var rulerLayer;
  var isRulerActive = false;

  function startRulerTool() {
      if (isRulerActive) return;

      isRulerActive = true;
      setTextH("Ruler tool activated. Click to start measuring.");

      // Activate drawing mode for polyline (ruler)
      map.fire('draw:drawstart', { layerType: 'polyline' });
      var drawHandler = new L.Draw.Polyline(map, drawControl.options.polyline);
      drawHandler.enable();

      map.on(L.Draw.Event.CREATED, function(event) {
          if (isRulerActive && event.layerType === 'polyline') {
              rulerLayer = event.layer;
              editableLayers.addLayer(rulerLayer);
              drawHandler.disable();
              map.fire('draw:drawstop', { layerType: 'polyline' });
              isRulerActive = false;
              enableEdit(rulerLayer);
              updateRulerInfo();
          }
      });
  }

  function enableEdit(layer) {
      if (layer.editing) {
          layer.editing.enable();
      } else {
          layer.enableEdit();
      }
      setTextH("Editing enabled. Click 'Stop Editing' to finish.");
  }

  function disableEdit(layer) {
      if (layer.editing) {
          layer.editing.disable();
      } else {
          layer.disableEdit();
      }
      setTextH("Editing disabled.");
  }

  stopEditingButton.addEventListener('click', function () {
      editableLayers.eachLayer(function (layer) {
          disableEdit(layer);
      });
  });

  deleteObjectButton.addEventListener('click', function () {
      isDeleteMode = !isDeleteMode;
      deleteObjectButton.textContent = isDeleteMode ? 'Exit Delete Mode' : 'Delete Object';
      setTextH(isDeleteMode ? 'Delete mode enabled. Click on an object to delete it.' : 'Delete mode disabled.');
  });

  function updateRulerInfo() {
      if (rulerLayer) {
          var latlngs = rulerLayer.getLatLngs();
          var length = calculateLength(latlngs);
          currentCoordinates.textContent = "Ruler Coordinates: " + latlngs.map(function (latlng) {
              return `[${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}]`;
          }).join(', ');
          polylineLength.textContent = "Ruler Length: " + length.toFixed(2) + ' meters';
      }
  }




      // Button click event to enable drawing modes
      document.getElementById('drawSquare').onclick = function() {
        enableDrawSquareMode();
    };

    function enableDrawSquareMode() {
        var squareDrawer = new L.Draw.Rectangle(map, {
            shapeOptions: {
                color: 'blue'
            }
        });
        squareDrawer.enable();
    
        var popup = L.popup();
    
        map.on(L.Draw.Event.DRAWVERTEX, function (event) {
            console.log("draw start")
            console.log(event)
            map.on('mousemove', function(e) {
            console.log("mouse move event ")

                if (squareDrawer._shape) {
                    var bounds = squareDrawer._shape.getBounds();
                    var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
                    var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
                    var center = bounds.getCenter();
                    popup
                        .setLatLng(center)
                        .setContent(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`)
                        .openOn(map);
                }
            });
        });
    
        map.on('draw:drawstop', function () {
            console.log("drawstop")

            map.off('mousemove');
            popup.removeFrom(map);
        });
    
        map.once('draw:created', function(event) {
            console.log("created")
            squareDrawer.disable();


            var layer = event.layer;
            // drawnItems.addLayer(layer);
            var bounds = layer.getBounds();
            var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
            var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
            var center = bounds.getCenter();
            layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`).openPopup();
        });
    
        map.on('draw:edited', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                if (layer instanceof L.Rectangle) {
                    var bounds = layer.getBounds();
                    var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
                    var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
                    var center = bounds.getCenter();
                    layer.bindPopup(`${width} m x ${height} m, coordinates are lat: ${center.lat.toFixed(6)}, lng: ${center.lng.toFixed(6)}`);
                }
            });
        });
    }
// ---------------------------1

// Get the container element by ID
// const ele = document.getElementById('container');

// // Initialize the FeatureGroup to store editable layers
// var editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

// // Initialize the Leaflet.draw control
// var drawControl = new L.Control.Draw({
//     draw: {
//         polyline: true,
//         polygon: false,
//         circle: false,
//         circlemarker: false,
//         marker: false,
//         rectangle: false,
//     },
//     edit: {
//         featureGroup: editableLayers,
//         remove: true
//     }
// });
// map.addControl(drawControl);

// // Get other elements by ID
// var currentCoordinates = document.getElementById('current-coordinates');
// var polylineLength = document.getElementById('polyline-length');

// var currentPolyline;

// // Event listener for when a new vertex is added (during drawing)
// map.on(L.Draw.Event.DRAWVERTEX, function (event) {
//     var layers = event.layers;
//     console.log("during drawing");

//     console.log(layers);
    
//     layers.eachLayer(function(layer) {
//         if (layer instanceof L.Polyline) {
             
//             currentPolyline = layer;
//             updateInfo();
//     console.log(currentPolyline);

//         }
//     });
// });

// // Event listener for when a polyline is created (finish drawing)
// map.on(L.Draw.Event.CREATED, function (event) {
//     setTextH("Finish drawing");
//     var layer = event.layer;
//     console.log("Finish drawing");

//      console.log(event);

//     if (layer instanceof L.Polyline) {
//         editableLayers.addLayer(layer);
//     }
//     currentPolyline = null; // Reset current polyline after drawing is finished
//     updateInfo();
//     console.log(currentPolyline);

// });

// // Function to update the information panel with current polyline data
// function updateInfo() {
//     if (currentPolyline) {
//         var latlngs = currentPolyline.getLatLngs();
//         var length = calculateLength(latlngs);
//         var coordinatesText = latlngs.map(function (latlng) {
//             return `[${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}]`;
//         }).join(', ');

//         currentCoordinates.textContent = "Coordinates: " + coordinatesText;
//         polylineLength.textContent = "Length: " + length.toFixed(2) + ' meters';
//     } else {
//         currentCoordinates.textContent = '';
//         polylineLength.textContent = '';
//     }
// }

// // Function to calculate the length of a polyline in meters
// function calculateLength(latlngs) {
//     var totalLength = 0;
//     for (var i = 1; i < latlngs.length; i++) {
//         totalLength += latlngs[i - 1].distanceTo(latlngs[i]);
//     }
//     return totalLength;
// }

// // Function to set text content of the container element
// function setTextH(text) {
//     ele.textContent = text;
// }
// ----------------------------------------0

// // Get the container element by ID
// const ele = document.getElementById('container');

// // Initialize the FeatureGroup to store editable layers
// var editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

// // Initialize the Leaflet.draw control
// var drawControl = new L.Control.Draw({
//     draw: {
//         polyline: true,
//         polygon: true,
//         circle: true,
//         circlemarker: false,
//         marker: false,
//         rectangle: false,
//     },
//     edit: {
//         featureGroup: editableLayers,
//         remove: true
//     }
// });
// map.addControl(drawControl);

// // Get other elements by ID
// var infoPanel = document.getElementById('info-panel');
// var currentCoordinates = document.getElementById('current-coordinates');
// var polylineLength = document.getElementById('polyline-length');

// var currentPolyline;
 

// // Event listener for when a polyline is created (start drawing)
// map.on('draw:drawstart', function (event) {
//     setTextH("Polyline is created");
//     currentPolyline = event.layer;
//     console.log(event)
//     updateInfo();
// });

// // Event listener for when a polyline is being drawn (during drawing)
// map.on(L.Draw.Event.DRAWVERTEX, function (event) {

//     console.log(event.latlng)
//     setTextH("Polyline is being drawn");
//     currentPolyline = event.layer;
//     updateInfo();
// });

// // Event listener for when a polyline is created (finish drawing)
// map.on(L.Draw.Event.CREATED, function (event) {
//     setTextH("Finish drawing");
//     var layer = event.layer;
//     editableLayers.addLayer(layer);
//     currentPolyline = null; // Reset current polyline after drawing is finished
//     updateInfo();
// });

// // Function to update the information panel with current polyline data
// function updateInfo() {
//     if (currentPolyline) {
//         var latlngs = currentPolyline.getLatLngs();
//         var length = currentPolyline._measurement;
//         var coordinatesText = latlngs.map(function (latlng) {
//             return `[${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}]`;
//         }).join(', ');

//         currentCoordinates.textContent = coordinatesText;
//         polylineLength.textContent = length.toFixed(2) + ' meters';
//     } else {
//         currentCoordinates.textContent = '';
//         polylineLength.textContent = '';
//     }
// }

// // Function to set text content of the container element
// function setTextH(text) {
//     ele.textContent = text;
// }
