"use strict";

import {openModal,closeModal} from './modal.js';
import { preencherEndereco } from './viaCep.js';
import { getFuncionarios,deleteFuncionario,postFuncionario,putFuncionario } from './funcionario.js';

const handleClickTr = async({target}) =>{  
    if(target.type === "button"){
        const action = target.textContent.trim();
        if(action === "Editar"){
            openModal("Atualizar",target.dataset.idfuncionario);
        }
        else{
            await deleteFuncionario(target.dataset.idfuncionario);
            carregarFuncionarios();
        }
    }
};



const criarLinha = ({nome,email,celular,id_funcionario}) =>{
    const linha = document.createElement("tr");
    linha.classList.add("registro-func", "text");
    linha.innerHTML = `
        <td class="foto"><img src="./img/func2.svg"></td>
        <td class="nome">${nome}</td>
        <td class="email">${email}</td>
        <td class="celular">${celular}</td>
        <td class="func">
            <button class="button green editar" type="button" data-idfuncionario=${id_funcionario}>Editar</button>
            <button class="button red" type="button" data-idfuncionario=${id_funcionario}>Deletar</button>
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
        "foto": "dasd/adsa/da",
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
carregarFuncionarios();

document.getElementById("save").addEventListener("click",  salvarFuncionario);
document.querySelector(".novo-func").addEventListener("click", openModal);
document.querySelector("tbody").addEventListener("click", handleClickTr);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("cep").addEventListener("focusout", preencherEndereco);