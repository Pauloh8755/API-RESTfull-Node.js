"use strict";
const Endereco = require("../models/Endereco");
const Funcionario =  require("../models/Funcionario");

const createAddress = async({endereco}) =>{
    const novoEndereco = await Endereco.create({
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf
    }).catch(()=>{
        return false;
    });
    return novoEndereco;
} 

const createEmployee = async(json, {id_endereco}) =>{
    
    const novoFuncionario = await Funcionario.create({
        nome: json.nome,
        data_nasc: json.data_nasc,
        rg: json.rg,
        cpf: json.cpf,
        email: json.email,
        celular: json.celular,
        foto: json.foto,
        sexo: json.sexo,
        id_endereco: id_endereco
    }).catch(()=>{
        return false;
    });
    return novoFuncionario;
};

const create = async (json) =>{
    const resAddress = await createAddress(json)
    if(resAddress){
        const resEmployee = createEmployee(json,resAddress);
        return resEmployee;
    }
    else{
        return resAddress;
    }
};


module.exports = create;