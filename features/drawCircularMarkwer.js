
// Function to add a circular marker with a popup
document.getElementById('addCircularMarker').onclick = function() {
    // Get the center of the map to place the circular marker
    var center = map.getCenter();

    // Prompt the user for a label
    var label = prompt("Enter a label for the marker:");

    // Create a circular marker
    var circleMarker = L.circleMarker(center, {
        radius: 10, // Radius of the circle
        color: 'blue', // Border color of the circle
        fillColor: '#f03', // Fill color of the circle
        fillOpacity: 0.5 // Fill opacity of the circle
    }).addTo(editableLayers);
    circleMarker.on('click', function(e) {
        selectLayer(e.target);

        
    });

    // Bind a popup to the circular marker with the custom label and initial coordinates
    var popupContent = `<b>${label}</b><br>Latitude: ${center.lat.toFixed(6)}<br>Longitude: ${center.lng.toFixed(6)}`;
    circleMarker.bindPopup(popupContent).openPopup();
};

// Event listener for when a layer is edited
map.on('draw:edited', function(event) {
    var layers = event.layers;
    layers.eachLayer(function(layer) {
        if (layer instanceof L.CircleMarker) {
            var latLng = layer.getLatLng();
            var popup = layer.getPopup();
            var content = popup.getContent();
            var label = content.split('<br>')[0];
            var updatedContent = `${label}<br>Latitude: ${latLng.lat.toFixed(6)}<br>Longitude: ${latLng.lng.toFixed(6)}`;
            layer.setPopupContent(updatedContent).openPopup();
        }
    });
});
