import { Request, Response } from "express";
import instructorsServices from "../services/instructorsServices";
import { IInstructors } from "../interface/InstructorsInterface";

class InstructorController{
    createInstrctor = async(req:Request, res:Response):Promise<void> =>{
        try {
            const instructorData:IInstructors = req.body;
            const newInstructor = await instructorsServices.createInstructor(instructorData)
            res.status(201).json({message:"Instructor Created !", newInstructor})

            
        } catch (error:any) {
                res.status(500).json({message:error.message})
        }
    }
}

export default new InstructorController();