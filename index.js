import ssim from "ssim.js";

let inputOriginal = this.document?.querySelector("#original");
const previewOriginal = this.document?.querySelector("#previewOriginal");
const inputCompare = this.document?.querySelector("#compare");
const previewCompare = this.document?.querySelector("#previewCompare");
const compareBtn = this.document?.querySelector("#compareBtn");

inputOriginal?.addEventListener('change', updateImageDisplay);
inputCompare?.addEventListener('change', updateImageDisplayC);
compareBtn?.addEventListener('click', compare);

function updateImageDisplay(){
    while(previewOriginal.firstChild){
        previewOriginal.removeChild(previewOriginal.firstChild);
    }
    const curFiles = inputOriginal.files;
    if(curFiles.length === 0){
        const p = document.createElement('p');
        p.textContent = 'No file selected';
        previewOriginal.appendChild(p);
    } else{
        const image = document.createElement('img');
        originalImage = URL.createObjectURL(curFiles[0])
        image.src = originalImage;
        previewOriginal.appendChild(image);
    }
}

function updateImageDisplayC(){
    while(previewCompare.firstChild){
        previewCompare.removeChild(previewCompare.firstChild);
    }
    const curFiles = inputCompare.files;
    if(curFiles.length === 0){
        const p = document.createElement('p');
        p.textContent = 'No file selected';
        previewCompare.appendChild(p);
    } else{
        const image = document.createElement('img');
        compareImage = URL.createObjectURL(curFiles[0])
        image.src = compareImage;
        previewCompare.appendChild(image);
    }
}

function compare(){
    ssim(originalImage,compareImage)
    .then(function(out){
        console.degub(out.mssim)
    })
}

function hasGetUserMedia(){
    return !!(navigator.getUserMedia || navibator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if(hasGetUserMedia()){
    
} else {
    alert("getUserMedia() is not supported in your browser :(");
}