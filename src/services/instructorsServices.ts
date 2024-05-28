import InstructorsModel from "../models/InstructorsModel";
import { IInstructors } from "../interface/InstructorsInterface";
import bcrypt from 'bcrypt'

class InstructorServices{
    createInstructor = async(instructorData:IInstructors):Promise<IInstructors>=>{
        
        const hashPass = await bcrypt.hash(instructorData.password,10);
        instructorData.password = hashPass;
        const newInstructor = new InstructorsModel(instructorData);
        return await newInstructor.save();
    }
}

export default new InstructorServices();