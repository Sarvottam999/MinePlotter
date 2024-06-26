 

var startPoint, endPoint;

document.getElementById('RowDoubleAntiPrnlTop').onclick = function() {
    // Change cursor style to crosshair
    // document.getElementById('map').classList.add('custom-cursor');
    // document.getElementById('map').classList.remove('default-cursor');
    document.getElementById('map').style.cursor = 'crosshair'

    // Listen for the first click to set the start point
    map.once('click', function(e) {
        startPoint = [e.latlng.lat, e.latlng.lng];
        console.log('Start point:', startPoint);

        // Listen for the second click to set the end point
        map.once('click', function(e) {
            endPoint = [e.latlng.lat, e.latlng.lng];
            console.log('End point:', endPoint);
            console.log("row - double - enti - up");


            drawLineRowDouble(startPoint, endPoint, marker_lines[5], editableLayers, Myicons[2], true);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};

document.getElementById('RowDoubleAntiPrnlDown').onclick = function() {
    console.log("clicked")
    // Change cursor style to crosshair
    // document.getElementById('map').classList.add('custom-cursor');
    // document.getElementById('map').classList.remove('default-cursor');
    document.getElementById('map').style.cursor = 'crosshair'

    // Listen for the first click to set the start point
    map.once('click', function(e) {
        startPoint = [e.latlng.lat, e.latlng.lng];
        console.log('Start point:', startPoint);

        // Listen for the second click to set the end point
        map.once('click', function(e) {
            endPoint = [e.latlng.lat, e.latlng.lng];
            console.log('End point:', endPoint);
            console.log("row - double - enti - down");


            drawLineRowDouble(startPoint, endPoint, marker_lines[5], editableLayers, Myicons[2], false);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};


 