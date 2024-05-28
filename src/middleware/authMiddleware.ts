import { NextFunction, Request, Response } from "express";
import { JwtUtills } from "../utils/jwtUtils";
import CustomRequest from "../types/customRequest";


async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.header('Authorization')?.split(' ')[1];
    // console.log(token);
    
    if (!token) {
        res.status(404).json({ error: "Token Not Found!" });
        return
    }
    try {
            const decoded = JwtUtills.verifyToken(token) as {Id:string, role:string};
            // console.log("De",decoded);
            
            // (req as CustomRequest).userId = decoded.userId;
            (req as CustomRequest).userId = decoded.Id;
            (req as CustomRequest).role = decoded.role;
            // console.log("Middlware ID",(req as CustomRequest).userId);
            
            next();
    } catch (error) {
        res.status(500).json({ error: "Token Has been Expired !" });
    }
}

export default verifyToken