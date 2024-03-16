
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const fileSize = selectedFile.size;
    const fileExtension = selectedFile.name.spliה
    if (fileSize > 10 * 1024 * 1024) {
      alert('File size exceeds the limit of 10 MB.');
      return;
    }

    document.getElementById('update-progress').style.width = `calc(100% * ${percentage})`
  
    uploadFile(selectedFile);
  }
});

function uploadFile(file) {
}
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


