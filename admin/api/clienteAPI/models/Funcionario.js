"use strict";
const Sequelize = require("sequelize");
const db = require("./connectMySQL");
const Endereco = require("./Endereco");

const Funcionario = db.define("tbl_funcionario", {
    id_funcionario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_nasc: {
        type: Sequelize.DATE,
        allowNull: true
    },
    rg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: true
    },
    foto: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    sexo: {
        type: Sequelize.CHAR,
        allowNull: true
    }
},
{
    timestamps: false,
});

Funcionario.belongsTo(Endereco, {
    constraint: true,
    as: "endereco",
    foreignKey: "id_endereco"
});

module.exports = Funcionario;