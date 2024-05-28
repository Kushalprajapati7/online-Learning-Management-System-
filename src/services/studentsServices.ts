import StudentModel from "../models/StudentsModel";
import { IStudents } from "../interface/StudentsInterface";
import bcrypt from 'bcrypt'
import { Types } from "mongoose";


class Student {
    createStudents = async (studentData: IStudents): Promise<IStudents> => {
        const hashPass = await bcrypt.hash(studentData.password,10);
        studentData.password = hashPass;
        const newStudent = new StudentModel(studentData);
        return await newStudent.save();
    }

    updatedStudent = async(id:string, studentData:IStudents, instructorId:Types.ObjectId):Promise<IStudents> =>{
        const hashPass = await bcrypt.hash(studentData.password,10);
        studentData.password = hashPass;
        studentData.updatedBy = instructorId;
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, studentData, {new:true})
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return updatedStudent;
    }

    showAllStudent = async():Promise<IStudents[]>=>{
        const students = await StudentModel.find();
        return students;
    }

    showStudentById = async(studentId:string):Promise<IStudents> =>{
        const student:any = await StudentModel.findById(studentId)
        return student;
    }

    deleteStudent = async(studentId:string):Promise<void> =>{
        await StudentModel.findByIdAndDelete(studentId);
    }


}

export default new Student();