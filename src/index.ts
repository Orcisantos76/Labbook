import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3003,()=>{
    console.log(`Servidor rodando na porta ${3003}, Labook`)
})

app.get("/ping", (req:Request, res: Response)=>{
    res.send("Conectado com sucesso")
})
