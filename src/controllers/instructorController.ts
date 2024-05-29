import { NextFunction, Request, Response } from "express";
import instructorsServices from "../services/instructorsServices";
import { IInstructors } from "../interface/InstructorsInterface";

class InstructorController{
    createInstrctor = async(req:Request, res:Response,next:NextFunction):Promise<void> =>{
        try {
            const instructorData:IInstructors = req.body;
            const newInstructor = await instructorsServices.createInstructor(instructorData)
            res.status(201).json({message:"Instructor Created !", newInstructor})

            
        } catch (error:any) {
                next(error)
        }
    }

    getInstructor = async(req:Request, res:Response, next:NextFunction):Promise<void> =>{
        try {
            const {page, limit,search,filter} = req.query;
            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;
            const searchString = search as string || "";
            const filterString = filter as string || "";
            
            const instructor = await instructorsServices.getInstructor(pageNumber, limitNumber,searchString,filterString);
            
            res.status(200).json(instructor)
        } catch (error:any) {
            next(error)

            
        }
    }
}

export default new InstructorController();