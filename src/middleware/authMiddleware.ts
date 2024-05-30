import { NextFunction, Request, Response } from "express";
import { JwtUtills } from "../utils/jwtUtils";
import CustomRequest from "../types/customRequest";
import { Types } from "mongoose";
import StudentModel from "../models/StudentsModel";
import InstructorsModel from "../models/InstructorsModel";
import AdminModel from "../models/AdminModel";
declare module "express" {
  interface Request {
    email?: string;
    userId?: string;
    roleId?: string;
    profile?: Types.ObjectId[];
  }
}

async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);

  // const token = req.header('Authorization')?.split(' ')[1];
  // console.log(token);

  if (!token) {
    res.status(404).json({ error: "Token Not Found!" });
    return;
  }
  try {
    const decoded = JwtUtills.verifyToken(token) as {
      Id: string;
      role: string;
    };
    console.log("De", decoded);

    // (req as CustomRequest).userId = decoded.userId;
    (req as CustomRequest).userId = decoded.Id;
    (req as CustomRequest).role = decoded.role;
    // console.log("Middlware ID",(req as CustomRequest).userId);
    console.log(decoded.Id);

    let user = await AdminModel.findById(decoded.Id);
    if (!user) {
      user = await StudentModel.findById(decoded.Id);
    }
    if (!user) {
      user = await InstructorsModel.findById(decoded.Id);
    }

    if (user) {
        req.profile = [user.profile];
        req.roleId = user.role
    }



    
    next();
  } catch (error) {
    next(error);
  }
}

export default verifyToken;
