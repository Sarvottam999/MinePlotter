 

var startPoint, endPoint;

document.getElementById('rowAntiPrnlTop').onclick = function() {
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
            console.log("row - single - enti - up");


            drawLineRow(startPoint, endPoint, marker_lines[3], editableLayers, Myicons[0], true);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};

document.getElementById('rowAntiPrnlDown').onclick = function() {
    // Change cursor style to crosshair
    // document.getElementById('map').classList.add('custom-cursor');
    // document.getElementById('map').classList.remove('default-cursor');
    document.getElementById('map').style.cursor = 'crosshair'

    // Listen for the first click to set the start point
    map.once('click', function(e) {
        startPoint = [e.latlng.lat, e.latlng.lng];
        console.log('Start point:', startPoint);
        console.log("row - single - enti - down");

        // Listen for the second click to set the end point
        map.once('click', function(e) {
            endPoint = [e.latlng.lat, e.latlng.lng];
            console.log('End point:', endPoint);
            console.log("check" );


            drawLineRow(startPoint, endPoint, marker_lines[3], editableLayers, Myicons[0], false);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};


 