import mongoose, { Schema } from "mongoose";
import { ICourse } from "../interface/CoursesInterface";

const CourseSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        instructorID: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
        duration: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    },
    {
        timestamps: true
    }
)

const CourseModel = mongoose.model<ICourse>('Course', CourseSchema)
export default CourseModel;