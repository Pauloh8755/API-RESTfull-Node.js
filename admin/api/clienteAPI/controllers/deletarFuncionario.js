"use strict";
const Endereco = require("../models/Endereco");
const Funcionario =  require("../models/Funcionario");

const deleteEmployee = async(id) =>{
    const res = await Funcionario.destroy({
        where:{
           id_funcionario: `${id}` 
        }
    }).catch(()=>{
        return false;
    });
    return res;
};

const deleteAddress = async(id) =>{
    const res = await Endereco.destroy({
        where:{
           id_endereco: `${id}` 
        }
    }).catch(()=>{
        return false;
    });
    return res;
};

const deleteEmp = async(id)=>{
    const resEmployee = deleteEmployee(id);
    if(resEmployee){
        const resAddress = deleteAddress(id);
        return resAddress;
    }
    else{
        return deleteEmployee;
    }
}

module.exports = deleteEmp;