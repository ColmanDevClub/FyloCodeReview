const totalSize = 10;

let usedSize = 0;
let percent;
let sizeLeft;

const usedSizeElement = document.getElementById('sizeOccupied');
const totalSizeElement = document.getElementById('totalSize');
const sizeLeftElement = document.getElementById('sizeLeft');
const progressElement = document.getElementById('progress');
const selectedFileP = document.getElementById('selectedFile');

const shortenSizeNumber = (x) => {
  return Number.parseFloat(x).toFixed(2);
};

const init = () => {
  usedSize = Number(window.localStorage.getItem('usedSize'));
  percent = 100 * (usedSize / totalSize) + 4;
  sizeLeft = totalSize - usedSize;
  totalSizeElement.innerText = totalSize + ' MB';
  sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
  usedSizeElement.innerText = shortenSizeNumber(usedSize) + ' MB';
  progressElement.style.width = percent.toString(1) + '%';
};

const addSize = (size) => {
  size /= Math.pow(1024, 2);
  if (usedSize + size < totalSize) {
    usedSize += size;
    sizeLeft = totalSize - usedSize;
    percent = 100 * (usedSize / totalSize) - 4;
    usedSizeElement.innerText = shortenSizeNumber(usedSize) + ' MB';
    sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
    progressElement.style.width = percent.toString(10) + '%';
    progressElement.style.transition = 'width 0.5s ease 0.1s';
  } else {
    alert('There is not enough space on the disk');
  }
};

const addFileName = (name, size) => {
  const span = document.createElement('span');
  span.innerText = `${name}`;
  const removeButton = document.createElement('button');
  removeButton.innerText = 'x';
  removeButton.addEventListener('click', () => {
    span.remove();
    addSize(-size);
  });
  span.appendChild(removeButton);
  span.style.margin = '5px';
  span.style.backgroundColor = 'lightgray';

  selectedFileP.appendChild(span);
};

const onFileInputChange = (e) => {
  const fileName = e.value.split('\\').pop();
  const isImgFile = new RegExp('(.(gif|jpeg|jpg|png|svg|ico))').test(fileName);
  if (isImgFile) {
    const file = e.files[0];
    addSize(file.size);
    addFileName(fileName, file.size);
  } else {
    alert('File Type Not Supported');
  }
};

init();
