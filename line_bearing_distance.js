 

let polyline = L.polyline([], { color: 'red' }).addTo(map);
let currentCoordinates = document.getElementById('coordinates');
let currentBearing = document.getElementById('bearing');
let currentDistance = document.getElementById('distance');
let startPoint = null;

function calculateBearing(lat1, lon1, lat2, lon2) {
  const toRadians = degree => degree * Math.PI / 180;
  const toDegrees = radian => radian * 180 / Math.PI;

  let dLon = toRadians(lon2 - lon1);
  let y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  let x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
          Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
  let bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = degree => degree * Math.PI / 180;
  const R = 6371e3; // metres
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}

map.on('click', function(e) {
  const latLng = e.latlng;
  polyline.addLatLng(latLng);
  if (!startPoint) {
    startPoint = latLng;
    map.on('mousemove', onMouseMove);
  } else {
    map.off('mousemove', onMouseMove);
    startPoint = null;
  }
});

function onMouseMove(e) {
  const latLng = e.latlng;
  currentCoordinates.innerText = latLng.lat.toFixed(5) + ', ' + latLng.lng.toFixed(5);

  if (startPoint) {
    const bearing = calculateBearing(startPoint.lat, startPoint.lng, latLng.lat, latLng.lng);
    const distance = calculateDistance(startPoint.lat, startPoint.lng, latLng.lat, latLng.lng);
    currentBearing.innerText = bearing.toFixed(2) + '°';
    currentDistance.innerText = (distance / 1000).toFixed(2) + ' km';
  }
}
