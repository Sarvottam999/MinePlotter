// Function to update zoom level and distance
function updateZoomInfo() {
    const zoomLevel = map.getZoom();
    const zoomDistance = getZoomDistance(zoomLevel);
    
    document.getElementById('zoomLevel').innerText = zoomLevel;
    document.getElementById('zoomDistance').innerText = zoomDistance + ' meters';
  }
  
  // Function to calculate zoom distance
  function getZoomDistance(zoom) {
    // Formula to approximate the meters per pixel based on zoom level
    // This is an approximation and may vary based on the map projection and tile size
    const scale = 156543.03392 * Math.cos(map.getCenter().lat * Math.PI / 180) / Math.pow(2, zoom);
    return (scale * 256).toFixed(2);
  }
  
  // Update info on map load and zoom end
  map.on('load', updateZoomInfo);
  map.on('zoomend', updateZoomInfo);
  
  // Initial update
  updateZoomInfo();