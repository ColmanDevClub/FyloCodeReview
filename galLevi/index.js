const fileInput = document.getElementById('file-input');
const stringSet = new Set(['image/jpg', 'image/jpeg', 'image/gif', 'image/png']);


const GB = document.getElementById('BB');
const MB = document.getElementById('MBB');
const MB1 = document.getElementById('MBB2');
const MB2= document.getElementById('MBB3');

GB.style.width="0px";
let i=0;
MB.innerText = parseInt(GB.style.width)+'MB';
MB1.innerText = parseInt(GB.style.width)+'MB';
MB2.innerText = 100+'MB ';

let allSelectedFiles = []; 


fileInput.onchange = () => {

    const selectedFiles = [...fileInput.files];
    let fileSize = 0;
    for(let i=0 ; i<selectedFiles.length ; i++){
        fileSize+=fileInput.files[i].size / 1024 / 1024;
        console.log(fileSize);

    }

    if(selectedFiles.length>0){
        const lastFile = selectedFiles[selectedFiles.length - 1];
            if(!stringSet.has(lastFile.type)){
                alert("You didnt uploded the right file!");
                selectedFiles.splice(-1, 1);       
            }
            else if(parseInt(GB.style.width)<100 && (parseInt(GB.style.width) + fileSize)<=100){
                GB.style.width = (parseInt(GB.style.width) + fileSize) + '%';
                for(let i=0 ; i<selectedFiles.length ; i++){
                    MB.innerText = parseInt(GB.style.width)+'MB';
                    MB1.innerText = parseInt(GB.style.width)+'MB';
                    MB2.innerText = (100-parseInt(GB.style.width))+'MB';
                    allSelectedFiles = [...allSelectedFiles, ...selectedFiles];
                    fileshow(allSelectedFiles);
                    saveToLocalStorage(allSelectedFiles);
                }
            }
            else{
                alert("You reaced to Max size you can Upload. Please try to delete some of your files :)");
            }
    }
}

const fileshow = (allSelectedFiles) => {
    const FF2 = document.getElementById('filejs');
    let filewrapper = document.getElementById('filewrapper'); 
    if (!filewrapper) {
        filewrapper = document.createElement("div");
        filewrapper.id = "filewrapper";
        FF2.append(filewrapper);
    }


    const container = document.createElement("div");
    container.classList.add("container");
    const showFE = document.createElement("div");
    showFE.classList.add("lst");
    const showfilel = document.createElement("span");
    showfilel.innerHTML = allSelectedFiles[allSelectedFiles.length - 1].name;
    showFE.append(showfilel);
    container.append(showFE);

    const rightB = document.createElement("div");
    rightB.classList.add("rightclick");
    const btn = document.createElement("span");
    btn.id = i;
    i++;
    btn.innerHTML = "&#215;";

    btn.addEventListener('click', (event) => { 
        const buttonMB = event.target.id;
        const FX = allSelectedFiles[buttonMB].size/(1024*1024);
        if((parseInt(GB.style.width) - FX)<=0){
            GB.style.width = '0px';
            MB.innerText = parseInt(GB.style.width)+'MB';
            MB1.innerText = parseInt(GB.style.width)+'MB';
            MB2.innerText = 100+'MB '; 
            filewrapper.remove();
        }
        else{
            GB.style.width = (parseInt(GB.style.width) - FX) + '%';
            MB.innerText = parseInt(GB.style.width)+'MB';
            MB1.innerText = parseInt(GB.style.width)+'MB';
            MB2.innerText = 100-parseInt(GB.style.width)+'MB ';        }
        container.remove();
    });
    rightB.append(btn);
    container.append(rightB);
    filewrapper.append(container);


};

const saveToLocalStorage = (files) => {
    const fileNames = files.map(file => file.name);
    localStorage.setItem('uploadedFiles', JSON.stringify(fileNames));
};

const fileIcon = document.getElementById('file-icon');
fileIcon.addEventListener('click', function () {
    fileInput.click();
});
