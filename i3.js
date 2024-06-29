 
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

     

       

        