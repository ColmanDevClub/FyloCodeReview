class UploadImage{

    constructor() {
        this.maxSize = 185;
        this.currentSize = 0;
        this.isFull = false;
    }
    
    isFull(){
        return this.maxSize > this.currentSize;
    }

    upload_one_image(){
        alert('123');
    }





}
