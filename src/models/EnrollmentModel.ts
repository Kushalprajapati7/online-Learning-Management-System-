import mongoose, { Types, Schema } from "mongoose";
import { IEnrollment } from "../interface/EnrollmentInterface";

const EnrollmentSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    enrollmentDate: { type: Date, required: true, default: Date.now },
    status: {
        type: String,
        required: true,
        enum: ['Enrolled', 'Completed', 'Dropped'],
        default: 'Enrolled'
    }
},
    {
        timestamps: true
    })

const EnrollmentModel = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema)
export default EnrollmentModel;