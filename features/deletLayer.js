 
document.getElementById('deleteSelected').addEventListener('click', removeSelectedMarkers);


function removeSelectedMarkers() {
    if (selectedLayersForDelete.length > 0) {
        selectedLayersForDelete.forEach(l => {
            editableLayers.removeLayer(l);
        });
        selectedLayersForDelete = [];
        
    }
    else{
        alert('Please select a layer to delete.');
}

   
  }