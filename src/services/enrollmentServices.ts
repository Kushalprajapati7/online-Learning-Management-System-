import EnrollmentModel from "../models/enrollmentModel";
import { IEnrollment } from "../interface/EnrollmentInterface";

class EnrollmentServices{
    createEnrollment = async (enrollmentData: IEnrollment): Promise<IEnrollment> => {
        const newEnrollment = new EnrollmentModel(enrollmentData);
        return await newEnrollment.save();
    }

    updateEnrollment = async (enrollmentId: string, enrollmentData: IEnrollment): Promise<IEnrollment> => {
        const updatedEnrollment = await EnrollmentModel.findByIdAndUpdate(enrollmentId, enrollmentData, { new: true })
        if (!updatedEnrollment) {
            throw new Error('enrollment not found');
        }
        return updatedEnrollment;
    }

    enrollmentById = async (enrollmentId: string): Promise<IEnrollment> => {
        const enrollment: any = await EnrollmentModel.findById(enrollmentId);
        return enrollment
    }

    deleteEnrollment = async (enrollmentId: string): Promise<void> => {
        await EnrollmentModel.findByIdAndDelete(enrollmentId);
    }
}

export default new EnrollmentServices();