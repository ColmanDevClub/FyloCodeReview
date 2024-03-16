const input = document.getElementById('file');
const progress=document.querySelector('.gradient-bar');
var total=10;
var totalpercent=0;
var sum=0;
function info(){
    const pattern1=/jpg$/;
    const pattern2=/jpeg$/;
    const pattern3=/gif$/;
    const pattern4=/png$/;
    var files=input.files;
    console.log(files[0].type);
    if((!pattern1.test(files[0].type)) && (!pattern2.test(files[0].type)) && (!pattern3.test(files[0].type)) && (!pattern4.test(files[0].type)))
    {
        alert('File format isn’t supported')
        return;
    }
    var size=files[0].size;
    var fileSize=(size/(1024*1024)).toFixed(2);
    if(fileSize>10)
    {
     alert('There is not enough space on the disk');
     return;
    }
    sum=(sum+ parseFloat(fileSize));
    total=total-fileSize;
    if(total<0)
        {
         alert('There is not enough space on the disk');
         return;
        }
    document.getElementById('span1').innerHTML=total.toFixed(2);
    document.getElementById('element2').innerHTML=sum.toFixed(2);
    let percent=(fileSize/10)*100;
    totalpercent+=percent;
    progress.style.width = `${totalpercent}%`

}
