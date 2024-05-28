import InstructorsModel from "../models/InstructorsModel";
import { IInstructors } from "../interface/InstructorsInterface";
import { IStudents } from "../interface/StudentsInterface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import StudentModel from "../models/StudentsModel";
import { JwtUtills } from "../utils/jwtUtils";

class AuthServices {
    login = async (email: string, password: string): Promise<string> => {
        let user: IInstructors | IStudents | null = await InstructorsModel.findOne({ email });
        if (!user) {
            user = await StudentModel.findOne({ email });
        }           

        if (!user) {
            throw new Error(`Invalid credentials`)
        }

        const pass = bcrypt.compare(user.password, password);

        if (!pass) {
            throw new Error(`Incorrect password`);
        }

       
        // const token = jwt.sign({ userId: user._id, role: user.role }, 'KP', { expiresIn: '1h' });
        const token = JwtUtills.generateToken(user._id as unknown as string, user.role);
        return token;
    }
}


export default new AuthServices();