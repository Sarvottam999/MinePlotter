  // Get the container element by ID
   var coordinatesContainer = document.getElementById('coord-info');
  map.on('mousemove', function(e) {
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);
    coordinatesContainer.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;
});

document.getElementById('copy-button').addEventListener('click', function() {
  // Create a temporary textarea element to hold the content
  const tempTextarea = document.createElement('textarea');
  // Set the value of the textarea to the content of the div
  tempTextarea.value = document.getElementById('coord-info').innerText;
  // Append the textarea to the body (it's not visible)
  document.body.appendChild(tempTextarea);
  // Select the content of the textarea
  tempTextarea.select();
  // Copy the selected content to the clipboard
  document.execCommand('copy');
  // Remove the temporary textarea from the document
  document.body.removeChild(tempTextarea);

		showToast("Copied Cordinates!","success",5000); 
  
  // Optionally, give feedback to the user
  // alert('Content copied to clipboard!');
});
