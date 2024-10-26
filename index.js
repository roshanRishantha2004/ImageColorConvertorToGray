class ChangeColortoGray {
    constructor (_width, _height, _canvaId) {

        this.width = _width;
        this.height = _height;
        this.canvaId = _canvaId;
    }

    createCanvas() {

        this.canvas = document.getElementById(this.canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    showImage(imageSrc) {

        this.createCanvas();
        this.image = new Image();
        this.image.src = imageSrc;

        this.image.onload = () => {

            this.ctx.drawImage(this.image, 0, 0);
            this.scannedImage = this.ctx.getImageData(0, 0, this.width, this.height);

            console.log(this.scannedImage);

            const scannedData = this.scannedImage.data;

            for (let i=0; i < scannedData.length; i += 4) {
                const total = scannedData[i] + scannedData[i+1] + scannedData[i+2]
                const averageColorValue = total/3;
                scannedData[i] = averageColorValue;
                scannedData[i+1] = averageColorValue;
                scannedData[i+2] = averageColorValue;
            }

            this.ctx.putImageData(this.scannedImage, 0, 0);
        }
    }
}


document.getElementById('fileInput').addEventListener('change', function (event) {

    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imgSrc = e.target.result; 
            let newImage = new ChangeColortoGray(640, 398, 'canva'); 
            newImage.showImage(imgSrc); 
        };

        reader.readAsDataURL(file);
        
    } else {
        alert('No file selected!');
    }
});
