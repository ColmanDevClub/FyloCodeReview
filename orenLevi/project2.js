const uploadButton = document.getElementById('uploadFile');

document.addEventListener('DOMContentLoaded', function() {
    const documantButton = document.getElementById('documentButton');
    const gradientBar = document.getElementById('gradientBar');
    const sizeText = document.getElementById('sizeText');
    const remaningSize = document.getElementById('remaningSize');
    const fileNamesContainer = document.getElementById('fileNamesContainer');
    const restMem = document.getElementById('restMem');
    getLocalStorage();
});

let totalSizeInMB = 0;

function getLocalStorage() { // the function get the file how save in the local storage
    var tmpdata = JSON.parse(localStorage.getItem('fileStorage'));
    if (tmpdata)
        createFileButton(tmpdata, tmpdata.sizeInMB); 
}

function updateTotalSize(sizeInMB) { //the function calculate the gradientBar and update 
    totalSizeInMB += sizeInMB;
    let percentage = (totalSizeInMB / 10) * 100;
    gradientBar.style.width = percentage + '%';
    remaningSize.textContent = (10 - totalSizeInMB).toFixed(2) + ' MB';
    restMem.textContent = totalSizeInMB.toFixed(2) + ' MB';
}

function removeFile(fileSizeInMB) { //if i click on the button i create its delete 
    totalSizeInMB -= fileSizeInMB;
    let percentage = (totalSizeInMB / 10) * 100;
    gradientBar.style.width = percentage + '%';
    remaningSize.textContent = (10 - totalSizeInMB).toFixed(2) + ' MB';
    restMem.textContent = totalSizeInMB.toFixed(2) + ' MB';
}

function createFileButton(file, fileSizeInMB) { // the funcion create new file button
    let fileName = file.name.split('.').slice(0, -1).join('.');
    let fileNameElement = document.createElement('button');
    fileNameElement.classList.add('file-button');
    fileNameElement.textContent = fileName;
    fileNameElement.addEventListener('click', function() {
        fileNamesContainer.removeChild(fileNameElement);
        removeFile(fileSizeInMB);
        localStorage.removeItem('fileStorage');
    });
    fileNamesContainer.appendChild(fileNameElement);
    updateTotalSize(fileSizeInMB); 
}

function importData() { //the function open the file explorer and call the other function
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.png, .gif, .jpeg, .jpg';
    input.onchange = _ => {
        let files = Array.from(input.files);
        files.forEach(function(file) {
            let fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 10) {
                alert('File size exceeds the 10 MB limit: ' + file.name);
                return;
            }
            let fileData = {
                name: file.name,
                sizeInMB: fileSizeInMB
            };
            localStorage.setItem('fileStorage', JSON.stringify(fileData));
            createFileButton(file, fileSizeInMB);
        });
    };
    input.click();
}

uploadButton.addEventListener('click', importData);
