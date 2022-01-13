"use strict";

import {openModal,closeModal,openConfirm,closeConfirm} from './modal.js';
import { preencherEndereco } from './viaCep.js';
import { getFuncionarios,deleteFuncionario,postFuncionario,putFuncionario } from './funcionario.js';
import { imagePreview } from './uploadImage.js';

const handleClickConfirm = async({target}) => {
    if(target.type === "button"){
        const action = target.textContent.trim();
        if(action === "Sim"){
            await deleteFuncionario(target.dataset.idfuncionario);
            carregarFuncionarios();
        }
    }
};
const handleClickTr = async({target}) =>{  
    if(target.type === "button"){
        const action = target.textContent.trim();
        if(action === "Editar"){
            openModal("Atualizar",target.dataset.idfuncionario);
        }
    }
};
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    const btoa = window.btoa( binary );
    return window.atob(btoa);
}
const criarLinha = ({nome,email,celular,foto,id_funcionario}) =>{
   const img = _arrayBufferToBase64(foto.data);


    const linha = document.createElement("tr");
    linha.classList.add("registro-func", "text");
    linha.innerHTML = `
        <td class="foto"><img src="${img}"></td>
        <td class="nome">${nome}</td>
        <td class="email">${email}</td>
        <td class="celular">${celular}</td>
        <td class="func">
            <button class="button green editar" type="button" data-idfuncionario=${id_funcionario}>Editar</button>
            
            <label for="funcionario${id_funcionario}" id="btn-deletar"class="button red" type="button">Deletar</label>
            <input type="checkbox" class="check-modal" name="funcionario${id_funcionario}"id="funcionario${id_funcionario}">
            <div class="container-confirm">
                <p class="small-text">Tem certeza que deseja Deletar?</p>
                <div>
                    <label for="funcionario${id_funcionario}" id="cancel-delete" type="button" class="btn-confirm green">Não</label>
                    <button id="confirm-delete" type="button" class="btn-confirm red"  data-idfuncionario=${id_funcionario}>Sim</button>
                </div>
            </div>
        </td>
    `;
    return linha;

};

const carregarFuncionarios = async() =>{
    const container = document.querySelector("tbody");
    const funcionarios = await getFuncionarios();
    const linhas = funcionarios.map(criarLinha);
    container.replaceChildren(...linhas);
};
const dataFormatBD = (date) =>{
    const array = date.split("/");
    const newDate = `${array[2]}-${array[1]}-${array[0]}`;
    return newDate;
};

const salvarFuncionario = async({target}) =>{
    const data = dataFormatBD(document.getElementById("data").value);


    const funcionario = {
        "nome": document.getElementById("nome").value,
        "data_nasc": data,
        "rg": document.getElementById("rg").value,
        "cpf": document.getElementById("cpf").value,
        "email": document.getElementById("email").value,
        "celular": document.getElementById("celular").value,
        "foto": document.getElementById("imagePreview").src,
        "sexo": document.querySelector("input[name=rdoSexo]:checked").value,
        "endereco" : {
            "cep": document.getElementById("cep").value,
            "logradouro": document.getElementById("logradouro").value,
            "numero": document.getElementById("numero").value,
            "bairro": document.getElementById("bairro").value,
            "cidade": document.getElementById("cidade").value,
            "uf": document.getElementById("uf").value
        }
    };
  
    if(target.value === "Cadastrar"){
        await postFuncionario(funcionario);
    }
    else{
        await putFuncionario(funcionario,target.dataset.idfuncionario);
    }
    closeModal();
    carregarFuncionarios();
};
const handlePreview = () => imagePreview("imagePreview");

carregarFuncionarios();

document.getElementById("save").addEventListener("click",  salvarFuncionario);
document.querySelector(".novo-func").addEventListener("click", openModal);
document.querySelector("tbody").addEventListener("click", handleClickTr);
document.querySelector("tbody").addEventListener("click", handleClickConfirm);
document.getElementById("inputFile").addEventListener("change", handlePreview);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("cep").addEventListener("focusout", preencherEndereco);
// document.getElementById("btn-deletar").addEventListener("click", openConfirm);
// document.getElementById("cancel-delete").addEventListener("click", closeConfirm);

export{
    _arrayBufferToBase64
};