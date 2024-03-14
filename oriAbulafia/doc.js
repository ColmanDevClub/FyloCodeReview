document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const openFileExplorer = document.getElementById('openFileExplorer');
    var totalspace=10240;
    var i=0;
    var x=0;
    openFileExplorer.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (/\.(jpg|jpeg|gif|png)$/.test(fileName)) {
                document.getElementById('Error').innerText = '';
                x=0;
            } else {
                document.getElementById('Error').innerText = 'File format isn’t supported';
                x=1;
            }
        }
    });
    document.getElementById('fileInput').addEventListener('change', function() {
        if(x==0){
    
            var file = this.files[0];
            var fileSize = file.size;
            var FilesizeKB = (fileSize / 1024).toFixed(2);
           
            if ((totalspace-=FilesizeKB)<0)
            {
                document.getElementById('Error').innerText = 'NO SPACE!!!';
                totalspace+=FilesizeKB;
            }

            else
            {
                var container = document.createElement('filebox');
                container.className = 'storage-container';
                document.body.appendChild(container);
                container.style.top = '100px';
                container.style.left = '70px';
                container.style.color = 'white';
                container.style.marginLeft= '10px';
                
                var per= totalspace/10240;
                var formper= per.toFixed(2);
                var endper= (100-(100*formper));
                document.querySelector('.gradient-bar').style.width = endper+'%';
                var mbleft= totalspace/1024;
                var mbend= mbleft.toFixed(1);
                var mbused= 10-mbend;
                var mbusedend= mbused.toFixed(1);
                document.getElementById('mbtext').textContent= mbend.toString();
                document.getElementById('usedmb').textContent= mbusedend.toString()+' MB';
                var filename = file.name;
                container.innerHTML += filename;
            }
        }
        
    });

});
