import mongoose, { Types, Schema } from "mongoose";
import { IEnrollment } from "../interface/EnrollmentInterface";

const EnrollmentSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Course ID is required"]
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, "Student ID is required"]
    },
    enrollmentDate: {
        type: Date,
        required: [true, "Enrollment Date is required"],
        validate: {
            validator: function (value: Date) {
                return value >= new Date()
            },
            message: "Enrollment Date must be greater than or equal to today's date"
        },
        default: Date.now
    },
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