"use strict";

const url = "http://localhost:3000/funcionario/";

const getFuncionarios = async() =>{
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
const getFuncionario = async(id) =>{
    console.log(`${url}${id}`);
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    return data;
};

const deleteFuncionario = async(id) =>{
    const options = {
        method: "DELETE",
        headers: {
            "content-Type": "application/json"
        },
    };
    await fetch(`${url}${id}`, options)
}



const postFuncionario = async(funcionario) =>{
    const options = {
        method: "POST",
        body: JSON.stringify(funcionario),
        headers: {
            "content-Type": "application/json"
        },
    };
    console.log(funcionario, options);
    await fetch(url,options);
};
const putFuncionario = async(funcionario,id) =>{
    const options = {
        method: "PUT",
        body: JSON.stringify(funcionario),
        headers: {
            "content-Type": "application/json"
        },
    };
    await fetch(`${url}${id}`,options);
};

export{
    getFuncionarios,getFuncionario,deleteFuncionario,postFuncionario,putFuncionario
};