"use strict";
const Endereco = require("../models/Endereco");
const Funcionario =  require("../models/Funcionario");

const searchAllEmployee = async () =>{
    const funcionarios = await Funcionario.findAll({ 
        include:{
            model: Endereco,
            as: "endereco",
            required: true,
            attributes: {
                exclude: ["id_endereco"]
            }
        },
        attributes:{
            exclude: ["id_endereco"]
        },
        order: [["id_funcionario", "DESC"]]
        
    });
    return funcionarios;
};
const serchOneEmployee = async (id) => {
    const funcionario = await Funcionario.findOne({
        include:{
            model: Endereco,
            as: "endereco",
            required: true,
        },
        attributes:{
            exclude: ["id_endereco"]
        },
        where: {
            id_funcionario : `${id}`
        }
    });
    if(!funcionario){
        return false;
    }
    else{
        return funcionario;
    }
};


module.exports = {searchAllEmployee, serchOneEmployee};