function saveState(sizeNum, files) {
    localStorage.setItem('storageSize', sizeNum.toString());
    localStorage.setItem('storageFiles', JSON.stringify(files));
}


function loadState() {
    const size = parseFloat(localStorage.getItem('storageSize')) || 0;
    const files = JSON.parse(localStorage.getItem('storageFiles')) || [];

    return { sizeNum: size, files };
}



function updateDotPosition(sizeNum) {
    const gradientBar = document.querySelector('.gradient-bar');
    gradientBar.style.width = `${sizeNum}%`;
}


function updateLeft(sizeNum) {
    const left = document.getElementById("left");
    left.innerText = Math.round((100 - sizeNum) * 100) / 100;
}


function openFileExplorer() {
    document.getElementById('file-input').click();
}


function handleFileSelect(event) {
    const selectedFiles = event.target.files;
    let state = loadState();
    const sizeElement = document.getElementById('size');

    for (let i = 0; i < selectedFiles.length; i++) {
        const selectedFile = selectedFiles[i];
        const selectedFileSize = Math.round((selectedFile.size / 1000000) * 100) / 100;

        if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/png' || selectedFile.type === 'image/gif') {
            if (state.sizeNum + selectedFileSize < 100) {
                state.sizeNum = Math.round((state.sizeNum + selectedFileSize) * 100) / 100;
                sizeElement.innerText = state.sizeNum;
                state.files.push({ name: selectedFile.name, size: selectedFileSize });
                saveState(state.sizeNum, state.files);

                updateDotPosition(state.sizeNum);
                updateLeft(state.sizeNum);

                const filesDiv = document.getElementById("files");
                const button = document.createElement('button');
                button.textContent = selectedFile.name;
                button.classList.add('file-button');
                button.onclick = function () {
                    handleRemove(button, selectedFileSize);
                };

                filesDiv.appendChild(button);
            } else {
                alert("There is not enough space on the disk");
            }
        } else {
            alert("File format isn't supported");
        }
    }
}


function handleRemove(button, fileSize) {
    let state = loadState();
    state.sizeNum = Math.round((state.sizeNum - fileSize) * 100) / 100;

    state.files = state.files.filter(file => file.name !== button.textContent);
    saveState(state.sizeNum, state.files);

    const sizeElement = document.getElementById('size');
    sizeElement.innerText = state.sizeNum;
    updateDotPosition(state.sizeNum);
    updateLeft(state.sizeNum);
    button.style.display = 'none';

    document.getElementById('file-input').value = '';
}


document.addEventListener('DOMContentLoaded', function () {
    let state = loadState();
    updateDotPosition(state.sizeNum);
    updateLeft(state.sizeNum);
    const sizeElement = document.getElementById('size');
    sizeElement.innerText = state.sizeNum

    const filesDiv = document.getElementById("files");
    state.files.forEach(file => {
        const button = document.createElement('button');
        button.textContent = file.name;
        button.classList.add('file-button');
        button.onclick = function () {
            handleRemove(button, file.size, state.files);
        };

        filesDiv.appendChild(button);
    });
});


function clearState() {
    localStorage.removeItem('storageSize');
    localStorage.removeItem('storageFiles');
}