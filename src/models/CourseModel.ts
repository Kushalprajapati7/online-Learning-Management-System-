import mongoose, { Schema } from "mongoose";
import { ICourse } from "../interface/CoursesInterface";

const CourseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [5, "Please enter title with at least 5 characters"]
        },
        description: {
            type: String,
            required: true
        },
        instructorID: {
            type: Schema.Types.ObjectId,
            ref: 'Instructor',
            required: [true, "Instructor ID is required"]
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: startDateValidator,
                message: "Start date must be before the end date"
            }
        },
        endDate: {
            type: Date,
            required: true,
            validate: {
                validator: endDateValidator,
                message: "End date must be after the start date"
            }
        },
    },
    {
        timestamps: true
    }
)

function startDateValidator(this: any, value: Date) {
    return value < this.endDate;
}

function endDateValidator(this: any, value: Date) {
    return value > this.startDate;
}

const CourseModel = mongoose.model<ICourse>('Course', CourseSchema)
export default CourseModel;
