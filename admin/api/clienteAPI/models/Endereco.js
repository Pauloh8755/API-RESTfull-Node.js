"use strict";
const Sequelize = require("sequelize");
const db = require("./connectMySQL");

const Endereco = db.define("tbl_enderecos", {
    id_endereco:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cep:{
        type: Sequelize.STRING,
        allowNull: false
    },
    logradouro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    uf:{
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
});

module.exports = Endereco;