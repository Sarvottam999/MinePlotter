 

var startPoint, endPoint;

document.getElementById('rowFragTop').onclick = function() {
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
            console.log("row - single - frag - up");


            drawLineRow(startPoint, endPoint, marker_lines[4], editableLayers, Myicons[1], true);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};


document.getElementById('rowFraglDown').onclick = function() {
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
            console.log("row - single - frag - down");



            drawLineRow(startPoint, endPoint, marker_lines[4], editableLayers, Myicons[1], false);

            // Reset cursor style to default
            document.getElementById('map').style.cursor = ''

            // document.getElementById('map').classList.add('default-cursor');
            // document.getElementById('map').classList.remove('custom-cursor');
        });
    });
};

 