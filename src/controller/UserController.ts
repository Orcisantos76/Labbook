import { Request,  Response } from "express";
import { UserDatabase } from "../database/UserDatabase";

export class UserController{
    public getUsers = async (req: Request, res: Response)=>{
        try {
            const q = req.query.q as string | undefined

            const userDatabase = new UserDatabase()
            const usersDB = await userDatabase.findUsers(q)

            

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}