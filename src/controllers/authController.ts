import authServices from "../services/authServices";
import { NextFunction, Request, Response } from "express";

class AuthController{
    login = async(req:Request, res:Response, next:NextFunction):Promise<void> =>{
        try {
                const {email, password} = req.body;
                const user = await authServices.login(email,password);
                
                res.status(200).json({message:"Login Succesffully", token:user})
        } catch (error) {
            next(error);
            
        }
    }
}

export default new AuthController();