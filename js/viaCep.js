"use strict";
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");

const pesquisarCep = async(cep) =>{
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
const limparCampos = () =>{
    logradouro.value = "";
    bairro.value = "";
    cidade.value = "";
    uf.value = "";
};
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const preencherEndereco = async({target}) =>{
    const cep  = target.value.replace("-", "");
    limparCampos();

    if(cep === "") return 0;

    if(cepValido(cep)){
        const infoCep = await pesquisarCep(cep);

        if(infoCep.erro){
           alert("CEP não encontrado"); 
        }
        else{
            logradouro.value = infoCep.logradouro;
            bairro.value = infoCep.bairro;
            cidade.value = infoCep.localidade;
            uf.value = infoCep.uf;
        } 
    }
    else{
        alert("digite o cep corretamente");
    }
};
export{
    preencherEndereco
};
