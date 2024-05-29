
import { IEnrollment } from "../interface/EnrollmentInterface";
import enrollmentServices from "../services/enrollmentServices";
import { NextFunction, Request, Response } from "express";

class EnrollmentController {
    createEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enrollmentData: IEnrollment = req.body;

            const newEnrollment = await enrollmentServices.createEnrollment(enrollmentData);
            res.status(201).json({ message: "Enrollment Added !", newEnrollment })

        } catch (error) {
            next(error)
        }
    }


}

export default new EnrollmentController();