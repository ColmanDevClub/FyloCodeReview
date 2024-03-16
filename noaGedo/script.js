let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-file");
let fileSizeSpan = document.getElementById("file-size");
let progressBar = document.getElementById("gradient-bar");
let leftMB = document.getElementById("gb-left");

function checkFileExtension(fileInput) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(fileInput.name)) {
        alert('Error: Please upload an image file (jpg, jpeg, png, gif)');
        fileInput.value = '';
        return false;
    }
    return true;
}

inputFile.onchange = function(){
    let file = inputFile.files[0]
    if (!checkFileExtension(file)) {
        return;
    }
    let fileSizeInMB = file.size/(1024*1024);
    if (fileSizeInMB>100)
    {
        alert("You've passed the limit. Image size up to 100MB");
        inputFile.value = '';
        fileSizeSpan.innerHTML = "0MB"
    }
    else{
        profilePic.src = URL.createObjectURL(inputFile.files[0]);
        fileSizeSpan.innerHTML = fileSizeInMB.toFixed(2)+"MB";
        left = 100 - fileSizeInMB ; 
        leftMB.innerHTML = left.toFixed(2);
        const usagePercentage = fileSizeInMB*100;//כפול 100 כדי להראות איזושהי התקדמות
        const progressBar = document.querySelector('.gradient-bar');
        progressBar.style.width = `${usagePercentage}%`;
    }

}

document.getElementById('input-file').addEventListener('change', function() {
    checkFileExtension(this.files[0]); 
});


