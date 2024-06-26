  // Event listener for drawing a polygon
  document.getElementById('drawPolygon').onclick = function() {
    var polygonDrawer = new L.Draw.Polygon(map);
    polygonDrawer.enable();

    map.once('draw:created', function(event) {
        var layer = event.layer;
        editableLayers.addLayer(layer);
        polygonDrawer.disable();
    });
};