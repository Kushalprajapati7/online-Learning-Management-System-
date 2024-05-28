import authServices from "../services/authServices";
import { Request, Response } from "express";

class AuthController{
    login = async(req:Request, res:Response):Promise<void> =>{
        try {
                const {email, password} = req.body;
                const user = await authServices.login(email,password);
                res.status(200).json({message:"Login Succesffully", token:user})
        } catch (error:any) {
            res.status(500).json({message:error.message})
            
        }
    }
}

export default new AuthController();