const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_funcionario", "root", "bcd127", {
    host: "localhost",
    dialect: "mysql"
});

//validando conexão
sequelize.authenticate().then(()=>{
    console.log("Sucesso");
}).catch(()=>{
    console.log("erro");
});

module.exports = sequelize;