"use strict";
import {getFuncionario} from "./funcionario.js";

const inputNome = document.getElementById("nome");
const inputData = document.getElementById("data");
const inputRg = document.getElementById("rg");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");
const inputCelular = document.getElementById("celular");
const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputNumero = document.getElementById("numero");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputUf = document.getElementById("uf");

const loadCheck = (sexo) =>{
    const sexoinput = document.querySelectorAll("input[name='rdoSexo']");
    for(var item in sexoinput){
        if(sexoinput[item].value == `${sexo}`){
            sexoinput[item].checked = true;
        }
        else if(sexoinput[item].checked == true){
            sexoinput[item].checked = false;
        }
    }

};

const limparCampos = () =>{
    loadCheck();
    inputNome.value = "";
    inputData.value = "";
    inputRg.value = "";
    inputCpf.value = "";
    inputEmail.value = "";
    inputCelular.value = "";
    inputCep.value = "";
    inputLogradouro.value = "";
    inputNumero.value = "";
    inputBairro.value = "";
    inputCidade.value = "";
    inputUf.value = "";
};
const dataFormat = (date) =>{
    const array = date.split("-");
    const newDate = `${array[2]}/${array[1]}/${array[0]}`;
    return newDate;
};
const loadFuncionario = async(id) =>{
    const {nome,data_nasc,sexo,rg,cpf,email,celular,endereco} = await getFuncionario(id);
    const data = dataFormat(data_nasc);
    loadCheck(sexo);
    inputNome.value = nome;
    inputData.value = data;
    inputRg.value = rg;
    inputCpf.value = cpf;
    inputEmail.value = email;
    inputCelular.value = celular;
    inputCep.value = endereco.cep;
    inputLogradouro.value = endereco.logradouro;
    inputNumero.value = endereco.numero;
    inputBairro.value = endereco.bairro;
    inputCidade.value = endereco.cidade;
    inputUf.value = endereco.uf;
};
const openModal = (content,id) =>{
    limparCampos();
    const btn = document.getElementById("save");
    if(content === "Atualizar"){
        btn.value = content;
        btn.setAttribute("data-idfuncionario", id);
        loadFuncionario(id);
    } 
    else{
        btn.value = "Cadastrar";
        
    }
    document.querySelector(".container-modal").classList.add("active");
};

const closeModal = () =>{
    document.querySelector(".container-modal").classList.remove("active");
};

export{
    openModal,
    closeModal
};