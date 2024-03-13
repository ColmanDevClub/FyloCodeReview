var storageUsed = 0;
var maxStorage = 999;

function openUploadFileDialog() {
    var fileUpload = document.getElementById('fileUpload');
    fileUpload.click();
    fileUpload.addEventListener('change', handleNewFile);
}

function handleNewFile() {
    var file = fileUpload.files[0];
    if (file) {
        var allowedExtensions = ['jpg', 'jpeg', 'gif', 'png'];
        var fileExtension = file.name.split('.').pop().toLowerCase();

        if (allowedExtensions.indexOf(fileExtension) === -1) {
            alert('File format is not supported.');
            file.value = '';
            return;
        }
        else {
            console.log('Uploaded file: ' + file.name);
            var fileSize = parseInt(file.size / (1024 * 1024 * 1024)); // in GB
            storageUsed += fileSize;
            maxStorage -= fileSize;
            changeStats();
        }
    }
}

function changeStats() {
    document.getElementById('storage-span').innerHTML = storageUsed + ' GB';
    document.getElementById('gb-left-span').innerHTML = maxStorage + ' ' + '<span>GB left</span>';
    document.getElementById('gradient-bar').style.width = (storageUsed / 999) * 100 + '%';
}