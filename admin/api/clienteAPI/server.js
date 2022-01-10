const express = require("express");
const app = express();
const cors = require("cors");
const finder = require("./controllers/listarFuncionario");
const create = require("./controllers/cadastrarFuncionario");
const update = require("./controllers/atualizarFuncionario");
const deletar = require("./controllers/deletarFuncionario");

app.use(cors());
app.use((req,res,next)=>{
   res.header("Acces-Control-Allow-Origin", "*");
   res.header("Acces-Control-Allow-Methods", "GET,PUT,POST,DELETE");
   res.header("Access-Control-Allow-Headers", "Content-Type");
   next();
});

app.use(express.json());

app.get("/funcionario", async(req, res) =>{
    const func = await finder.searchAllEmployee() 
    if(!func) return res.status(204).json();
    res.status(200).json(func);
});

app.get("/funcionario/:id", async (req,res)=>{
    const { id } = req.params;
    const funcionario = await finder.serchOneEmployee(id);
    if(!funcionario) return res.status(204).json('dadas');
    res.status(200).json(funcionario);
});

app.post("/funcionario", async(req,res)=>{
    const json = req.body;
    const resCreate = await create(json);
    if(!resCreate) return res.status(400).send("Objeto json incorreto");
    res.status(200).send("Dados inseridos com sucesso");
});

app.put("/funcionario/:id", async(req,res)=>{
    const { id } = req.params;
    const json = req.body;
    const resUpdate = await update(json,id);
    if(!resUpdate) return res.status(400).send("Objeto json incorreto");
    res.status(200).send("Dados atualizados com sucesso");
});

app.delete("/funcionario/:id", async(req,res)=>{
    const { id } = req.params;
    const resDelete = await deletar(id);
    if(!resDelete) return res.status(400).send("Falha ao deletar verifique o id");
    res.status(200).send("Dados deletados com sucesso");
});

app.listen(3000, () =>{
    console.log("server is running");
});


