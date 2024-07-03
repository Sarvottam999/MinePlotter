document.getElementById('addTextLabel').onclick = function() {
    var text = document.getElementById('labelText').value;

    // if (!currentRectangle) {
    //     alert('Please draw a rectangle first.');
    //     return;
    // }

    // var bounds = currentRectangle.getBounds();
    var center = map.getCenter();

    // if (labelMarker) {
    //     editableLayers.removeLayer(labelMarker);
    // }

    var labelIcon = L.divIcon({
        className: 'label-icon',
        html: text,
        iconSize: [50, 20]
    });


    var labelMarker = L.marker(center, { icon: labelIcon, draggable: true }).addTo(editableLayers);

    labelMarker.on('click', function(e) {
        selectLayer(e.target);
    });
    // labelMarker.on('click', function() {
    //     selectLayer(labelMarker);
    // });

    
    // labelMarker.on('dragend', function() {
    //     var newCenter = labelMarker.getLatLng();
    //     var newBounds = currentRectangle.getBounds();
    //     var dx = newCenter.lng - newBounds.getCenter().lng;
    //     var dy = newCenter.lat - newBounds.getCenter().lat;

    //     var newLatLngs = currentRectangle.getLatLngs()[0].map(function(latLng) {
    //         return [latLng.lat + dy, latLng.lng + dx];
    //     });
    //     currentRectangle.setLatLngs(newLatLngs);
    // });

    labelMarker.on('click', function() {
        var newText = prompt("Edit text:", text);
        if (newText !== null) {
            text = newText;
            labelMarker.setIcon(L.divIcon({
                className: 'label-icon maptextstyel1',
                html: newText,
                iconSize: [200, 100]
            }));
        }
    });
    map.fitBounds(labelMarker);

};