import mongoose, { Schema } from "mongoose";
import { IStudents } from "../interface/StudentsInterface";
import moment from "moment";  

const StudentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Please enter name with at least 3 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters long"]
        },
        major: {
            type: String,
            required: [true, "Major is required"],
            trim: true
        },
        enrollmentDate: {
            type: Date,
            required: [true, "Enrollment Date is required"],
            validate: {
                validator: function(value: Date) {
                    return value <= new Date();
                },
                message: "Enrollment Date cannot be in the future"
            },

        },
        role: {
            type: String,
            required: true,
            enum: {
                values: ['student'],
                message: '{VALUE} is not supported'
            }
        },
    },
    {
        timestamps: true
    }
)

const StudentModel = mongoose.model<IStudents>('Student', StudentSchema)
export default StudentModel;