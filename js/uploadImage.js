"use strict";

const imagePreview = (idImg) =>{
    const file = document.getElementById("inputFile").files[0];
    const preview = document.getElementById(idImg);
    const fileReader = new FileReader();

    if(file){
        fileReader.readAsDataURL(file);
    }
    
    fileReader.onloadend = ({target}) => preview.src = target.result;
    
};

export{
    imagePreview
};