import mongoose, { Schema } from "mongoose";
import { IStudents } from "../interface/StudentsInterface";

const StudentSchema = new Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true},
        major:{type:String, required:true},
        enrollmentDate:{type:Date, required:true},
        role: { type: String, required: true, enum: ['student'] },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'Instructor' } 
    },
    {
        timestamps:true
    }
)

const StudentModel  = mongoose.model<IStudents>('Student', StudentSchema)
export default StudentModel;