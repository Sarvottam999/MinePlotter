    
    
     // Add a tile layer to the map
    //  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    // }).addTo(map);
    
 // Initialize the feature group to store editable layers
//  var drawnItems = new L.FeatureGroup();
//  map.addLayer(drawnItems);

//  // Initialize the draw control and pass it the FeatureGroup of editable layers
//  var drawControl = new L.Control.Draw({
//      edit: {
//          featureGroup: drawnItems
//      },
//      draw: false
//  });
//  map.addControl(drawControl);

//  // Button click event to enable drawing mode
//  document.getElementById('drawSquare').onclick = function() {
//      enableDrawSquareMode();
//  };

//  function enableDrawSquareMode() {
//      var squareDrawer = new L.Draw.Rectangle(map, {
//          shapeOptions: {
//              color: 'blue'
//          }
//      });
//      squareDrawer.enable();

//      map.on(L.Draw.Event.CREATED, function(event) {
//          var layer = event.layer;
//          drawnItems.addLayer(layer);
//      });

//      // Disable drawing mode after drawing one square
//      map.on('mouseup', function() {
//          squareDrawer.disable();
//      });
//  }<script>
    // Initialize the map


    // Initialize the feature group to store editable layers
    // var drawnItems = new L.FeatureGroup();
    // map.addLayer(drawnItems);

    // // Initialize the draw control and pass it the FeatureGroup of editable layers
    // var drawControl = new L.Control.Draw({
    //     edit: {
    //         featureGroup: drawnItems
    //     },
    //     draw: false
    // });
    // map.addControl(drawControl);

    // // Button click event to enable drawing mode
    // document.getElementById('drawSquare').onclick = function() {
    //     enableDrawSquareMode();
    // };

    // function enableDrawSquareMode() {
    //     var squareDrawer = new L.Draw.Rectangle(map, {
    //         shapeOptions: {
    //             color: 'blue'
    //         }
    //     });
    //     squareDrawer.enable();

    //     var popup = L.popup();

    //     map.on('mousemove', function(e) {
    //         console.log(e)
    //         if (squareDrawer._shape) {
    //             var bounds = squareDrawer._shape.getBounds();
    //             var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
    //             var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
    //             var center = bounds.getCenter();
    //             popup
    //                 .setLatLng(center)
    //                 .setContent(`Width: ${width} m, Height: ${height} m<br>Center: lat ${center.lat.toFixed(6)}, lng ${center.lng.toFixed(6)}`)
    //                 .openOn(map);
    //         }
    //     });

    //     map.on('draw:drawstop', function () {
    //         map.off('mousemove');
    //         popup.removeFrom(map);
    //     });

    //     map.on('draw:created', function(event) {
    //         var layer = event.layer;
    //         drawnItems.addLayer(layer);
    //         popup.removeFrom(map);
    //     });
    // }



    // ---------------------------------------

    // Initialize the map
 

    // Initialize the feature group to store editable layers
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: false
    });
    map.addControl(drawControl);

    // Create a popup for displaying information
    var popup = L.popup();

    // Function to update the popup with square information
    function updatePopupSquare(bounds) {
        var width = map.distance(bounds.getNorthWest(), bounds.getNorthEast()).toFixed(2);
        var height = map.distance(bounds.getNorthWest(), bounds.getSouthWest()).toFixed(2);
        var center = bounds.getCenter();
        popup
            .setLatLng(center)
            .setContent(`Width: ${width} m, Height: ${height} m<br>Center: lat ${center.lat.toFixed(6)}, lng ${center.lng.toFixed(6)}`)
            .openOn(map);
    }

    // Function to enable square drawing mode
    // function enableDrawSquareMode() {
    //     var squareDrawer = new L.Draw.Rectangle(map, {
    //         shapeOptions: {
    //             color: 'blue'
    //         }
    //     });
    //     squareDrawer.enable();

    //     map.on('mousemove', function(e) {
    //         if (squareDrawer._shape) {
    //             var bounds = squareDrawer._shape.getBounds();
    //             updatePopupSquare(bounds);
    //         }
    //     });

    //     map.once('draw:drawstop', function () {
    //         map.off('mousemove');
    //         popup.removeFrom(map);
    //     });

    //     map.once('draw:created', function(event) {
    //         var layer = event.layer;
    //         drawnItems.addLayer(layer);
    //         popup.removeFrom(map);
    //     });
    // }


    function enableDrawSquareMode() {
        var squareDrawer = new L.Draw.Rectangle(map, {
            shapeOptions: {
                color: 'blue'
            }
        });
        // squareDrawer.enable();
    
        var popup = L.popup();
    
        map.on('draw:drawstart', function () {
            console.log("draw start")
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
    
        map.once('draw:drawstop', function () {
            console.log("drawstop")

            map.off('mousemove');
            popup.removeFrom(map);
        });
    
        map.once('draw:created', function(event) {
            console.log("created")

            var layer = event.layer;
            drawnItems.addLayer(layer);
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
    
    
    

    // Function to enable line drawing mode
    function enableDrawLineMode() {
        var lineDrawer = new L.Draw.Polyline(map, {
            shapeOptions: {
                color: 'red'
            }
        });
        lineDrawer.enable();
    }

    // Function to enable dotted line drawing mode
    function enableDrawDottedLineMode() {
        var dottedLineDrawer = new L.Draw.Polyline(map, {
            shapeOptions: {
                color: 'green',
                dashArray: '5, 10'
            }
        });
        dottedLineDrawer.enable();
    }

    // Function to enable zigzag line drawing mode
    function enableDrawZigzagLineMode() {
        var zigzagLineDrawer = new L.Draw.Polyline(map, {
            shapeOptions: {
                color: 'purple'
            }
        });
        zigzagLineDrawer.enable();
    }

    // Button click event to enable drawing modes
    document.getElementById('drawSquare').onclick = function() {
        enableDrawSquareMode();
    };

    document.getElementById('drawLine').onclick = function() {
        enableDrawLineMode();
    };

    document.getElementById('drawDottedLine').onclick = function() {
        enableDrawDottedLineMode();
    };

    document.getElementById('drawZigzagLine').onclick = function() {
        enableDrawZigzagLineMode();
    };

    // Handle the created event for all drawing modes
    map.on('draw:created', function(event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
    });
