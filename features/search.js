
var marker;

function goToLocation(lat, lng) {
  if (marker) {
    map.removeLayer(marker);
  }
  map.setView([lat, lng], 13);
//   marker = L.marker([lat, lng]).addTo(map);
}

document.getElementById('search-button').addEventListener('click', function() {
  var input = document.getElementById('search-input').value;

  // Check if input is coordinates
  var coords = input.split(',');
  if (coords.length === 2) {
    var lat = parseFloat(coords[0].trim());
    var lng = parseFloat(coords[1].trim());
    if (!isNaN(lat) && !isNaN(lng)) {
      goToLocation(lat, lng);
      return;
    }
  }

  // If not coordinates, use geocoding to get location by name
  var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(input);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var lat = data[0].lat;
        var lng = data[0].lon;
        goToLocation(lat, lng);
      } else {
        alert('Location not found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while searching for the location');
    });
});