var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polygon: false,
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false,
    circlemarker: false
  }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);
});

function drawLine() {
  drawControl._toolbars.draw._modes.polyline.handler.enable();
}

function drawShape() {
  drawControl._toolbars.draw._modes.polygon.handler.enable();
}

function createMarker() {
  var marker = L.marker(map.getCenter(), {draggable: true}).addTo(map);
  drawnItems.addLayer(marker);
}

function clearMap() {
  drawnItems.clearLayers();
}