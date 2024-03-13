document.addEventListener("DOMContentLoaded", function() {
    // Get the elements from the HTML file
    const imageInput = document.getElementById('imageInput');
    const progressBar = document.querySelector('.gradient-bar');
    const usedStorageElement = document.getElementById('used-storage');
    const MbLeftElement = document.getElementById('lefted-storage');

    let totalStorage = 100;
    let usedStorage = 0; // Start with 0 used storage

    // Event listener for file changes
    imageInput.addEventListener('change', function() {
        const selectedFiles = imageInput.files;

        if (selectedFiles) {
            let totalSelectedSizeKB = 0;

            // Loop for adding files and also checks if this is a correct file
            const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; // The Allowed image formats
            for (let i = 0; i < selectedFiles.length; i++) {
                const selectedFile = selectedFiles[i];
                if (!allowedFormats.includes(selectedFile.type)) {
                    alert('File format isn’t supported');
                    return;
                }
                totalSelectedSizeKB += selectedFile.size / 1024; // Convert bytes to KB
            }

            // Check available storage for all selected files
            const availableStorage = totalStorage - usedStorage;
            if (totalSelectedSizeKB > availableStorage) {
                alert('There is not enough space on the disk');
                return;
            }

            // Update used storage for all selected files
            usedStorage += totalSelectedSizeKB;
            updateStorageDisplay();
        }
    });

    // Function to update the storage display
    function updateStorageDisplay() {
        progressBar.style.width = (usedStorage / totalStorage) * 100 + '%'; // Changes the progress bar
        usedStorageElement.textContent = usedStorage.toFixed(0) ; // Changes the number of used storage
        MbLeftElement.textContent = (totalStorage - usedStorage).toFixed(0) ; // changes the number of lefted storage
    }

    
});
