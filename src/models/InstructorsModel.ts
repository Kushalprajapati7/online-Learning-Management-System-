import mongoose, { Schema } from "mongoose";
import { IInstructors } from "../interface/InstructorsInterface";

const InstructorsSchema = new Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true},
        department:{type:String, required:true},
        bio:{type:String, required:true},
        role: { type: String, required: true, enum: ['instructor'] }
    },
    {
        timestamps:true
    }
)

const InstructorsModel = mongoose.model<IInstructors>('Instructor',InstructorsSchema)
export default InstructorsModel;