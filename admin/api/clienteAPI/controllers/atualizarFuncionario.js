"use strict";
const Funcionario =  require("../models/Funcionario");
const Endereco =  require("../models/Endereco");
const finder = require("./listarFuncionario");

const updateEmployee = async(json,id) =>{
    const novoFuncionario = await Funcionario.update({
        nome: json.nome,
        data_nasc: json.data_nasc,
        rg: json.rg,
        cpf: json.cpf,
        email: json.email,
        celular: json.celular,
        foto: json.foto,
        sexo: json.sexo
    },
    {
        where:{
           id_funcionario: `${id}` 
        }
    }).catch(()=>{
        return false;
    });
    return novoFuncionario;
};
const updateAddress = async({endereco},id) =>{
    const novoEndereco = await Endereco.update({
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf
    },
    {
        where:{
            id_endereco: `${id}`
        }
    }).catch(()=>{
        return false;
    });
    return novoEndereco;
} 

const update = async (json,id) =>{
    const resEmployee = await updateEmployee(json,id);
    const {endereco} = await finder.serchOneEmployee(id);
    if(resEmployee){
        const resAddress = await updateAddress(json,endereco.id_endereco);
        
        return resAddress;
    }
    else{
        return resEmployee;
    }
};


module.exports = update;