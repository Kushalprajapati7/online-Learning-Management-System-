import { IEnrollment } from "../interface/EnrollmentInterface";
import enrollmentServices from "../services/enrollmentServices";
import { Request, Response } from "express";

class EnrollmentController {
    createEnrollment =async (req:Request,res:Response):Promise<void> =>{
        try {
            const enrollmentData:IEnrollment = req.body;
            
            const newEnrollment = await enrollmentServices.createEnrollment(enrollmentData);
            res.status(201).json({ message: "Enrollment Added !", newEnrollment })

        } catch (error:any) {
            res.status(500).json({ message: error.message })
            
        }
    }
}

export default new EnrollmentController();