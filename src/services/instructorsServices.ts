import InstructorsModel from "../models/InstructorsModel";
import { IInstructors } from "../interface/InstructorsInterface";
import bcrypt from 'bcrypt'

class InstructorServices {
    createInstructor = async (instructorData: IInstructors): Promise<IInstructors> => {

        const hashPass = await bcrypt.hash(instructorData.password, 10);
        instructorData.password = hashPass;
        const newInstructor = new InstructorsModel(instructorData);
        return await newInstructor.save();
    }

    getInstructor = async (page: number, limit: number, search?: string, filter?: string): Promise<IInstructors[]> => {
        const pipe: any[] = [];
        let matchObject: any = {};

        if (search) {
            matchObject.$or = [
                { name: { $regex: search, $options: "i" } },
                { department: { $regex: search, $options: "i" } },
                { bio: { $regex: search, $options: "i" } }
            ];
            
        }
        if (filter) {
            matchObject["department"] = {
                $regex: filter, $options: "i"
            }
        }

        if (Object.keys(matchObject).length > 0) {
            pipe.push({ $match: matchObject });
        }   
        pipe.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        )

        console.log(pipe);
        

        const result = await InstructorsModel.aggregate(pipe);
        return result
    }
}

export default new InstructorServices();