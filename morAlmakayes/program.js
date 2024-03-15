const totalDiskSpace = 30;
const totalDiskSpaceId = document.getElementById('totalDiskSpaceId');
totalDiskSpaceId.textContent = totalDiskSpace + ' MB ';

let usedSpace = 0;
const usedSpaceId = document.getElementById('usedSpaceId');
usedSpaceId.textContent = usedSpace;

let availableDiskSpace = totalDiskSpace - usedSpace;
const availableDiskSpaceId = document.getElementById('availableDiskSpaceId');
availableDiskSpaceId.textContent = availableDiskSpace+ ' MB ' ;

document.getElementById('openFileExplorer').onclick = function() {
    document.getElementById('fileInput').click();
};

const FillTheBar = document.getElementById('FillTheBarId');

document.getElementById('fileInput').onchange = function() {
    const files = this.files; 
    let totalFileSize = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        totalFileSize += file.size / 1048576; 
    }

    if (usedSpace + totalFileSize <= totalDiskSpace) {
        usedSpace += totalFileSize;
        availableDiskSpace = totalDiskSpace - usedSpace;

        usedSpaceId.textContent = usedSpace.toFixed(2);
        availableDiskSpaceId.textContent = availableDiskSpace.toFixed(2)+ ' MB ' ;

        FillTheBar.style.width = (usedSpace * 100) / totalDiskSpace + '%';

    } else {
        
        alert('There is not enough space on the disk, please try again');
        document.getElementById('fileInput').value = ''; 
        usedSpace = 0; 
        availableDiskSpace = totalDiskSpace; 
        usedSpaceId.textContent = usedSpace.toFixed(2); 
        availableDiskSpaceId.textContent = availableDiskSpace.toFixed(2)+ ' MB ' ; 
        FillTheBar.style.width = '0%'; 
    }לא
};    