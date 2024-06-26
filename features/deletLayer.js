


document.getElementById('deleteSelected').onclick = function() {
    if (selectedLayer) {
        editableLayers.removeLayer(selectedLayer);
        selectedLayer = null;
    } else {
        alert('Please select a layer to delete.');
    }
};

 