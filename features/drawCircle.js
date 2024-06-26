  // Event listener for drawing a circle
  document.getElementById('drawCircle').onclick = function() {
    var circleDrawer = new L.Draw.Circle(map);
    circleDrawer.enable();

    map.once('draw:created', function(event) {
        var layer = event.layer;
        editableLayers.addLayer(layer);
        circleDrawer.disable();
        layer.on('click', function(e) {
          selectLayer(e.target);

          
      });
    });
};