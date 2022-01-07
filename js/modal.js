"use strict";

const openModal = () =>{
    document.querySelector(".container-modal").classList.add("active");
}
const closeModal = () =>{
    document.querySelector(".container-modal").classList.remove("active");
}

export{
    openModal,
    closeModal
}