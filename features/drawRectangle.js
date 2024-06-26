var currentRectangle = null;

document.getElementById('drawRectangle2').onclick = function() {
    var width = parseFloat(document.getElementById('rectWidth').value);
    var height = parseFloat(document.getElementById('rectHeight').value);

    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
        alert('Please enter valid dimensions for width and height (greater than 0).');
        return;
    }

    var start = map.getCenter();
    drawRectangleByInput(start, height, width);
};


function drawRectangleByInput(start, h, w) {
    var options = { units: 'meters' };
    let arr = [];
    arr.push([start.lng, start.lat]);

    var bottomLeftPoint = turf.point([start.lng, start.lat]);

    var bottomRightPoint = turf.destination(bottomLeftPoint, w, 90, options);
    var bottomRight = bottomRightPoint.geometry.coordinates;
    arr.push(bottomRight);

    var toprightPoint = turf.destination(bottomRightPoint, h, 0, options);
    var topright = toprightPoint.geometry.coordinates;
    arr.push(topright);

    var topleftpont = turf.destination(toprightPoint, w, -90, options);
    var topleft = topleftpont.geometry.coordinates;
    arr.push(topleft);

    var bottumleftpont = turf.destination(topleftpont, h, 180, options);
    var bottumleft = bottumleftpont.geometry.coordinates;
    arr.push(bottumleft);

    drawRectangle(arr);
}

function drawRectangle(coordinates) {
    var latLngPoints = turfPointsToLatLng(coordinates);

    // if (currentRectangle) {
    //     editableLayers.removeLayer(currentRectangle);
    // }

    currentRectangle = L.rectangle(latLngPoints, { color: 'blue', editable: true }) 
            editableLayers.addLayer(currentRectangle);

            
            currentRectangle.on('click', function(e) {
                selectLayer(e.target);
            });
        

    currentRectangle.on('edit', function() {
        if (labelMarker) {
            var newBounds = currentRectangle.getBounds();
            labelMarker.setLatLng(newBounds.getCenter());
        }
    });

    map.fitBounds(currentRectangle.getBounds());
}


// function to draw line 
function home(){
    return text = "text1";
}

 
