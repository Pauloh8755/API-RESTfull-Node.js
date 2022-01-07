"use strict";

import {openModal,closeModal} from './modal.js';

const handleClickTr = ({target}) =>{
    if(target.type === "button"){
        const action = target.textContent.trim();
        if(action === "Editar"){
            openModal();
        }
    }
};

document.querySelector(".novo-func").addEventListener("click", openModal);
document.querySelector("table").addEventListener("click", handleClickTr);
document.getElementById("close-modal").addEventListener("click", closeModal);