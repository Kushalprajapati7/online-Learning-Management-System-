import StudentModel from "../models/StudentsModel";
import { IStudents } from "../interface/StudentsInterface";
import bcrypt from 'bcrypt'
import { Types } from "mongoose";


class Student {
    createStudents = async (studentData: IStudents): Promise<IStudents> => {
        const hashPass = await bcrypt.hash(studentData.password, 10);
        studentData.password = hashPass;
        const newStudent = new StudentModel(studentData);
        return await newStudent.save();
    }

    updatedStudent = async (id: string, studentData: IStudents, instructorId: Types.ObjectId): Promise<IStudents> => {
        const hashPass = await bcrypt.hash(studentData.password, 10);
        studentData.password = hashPass;
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, studentData, { new: true })
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return updatedStudent;
    }

    showStudentById = async (studentId: string): Promise<IStudents> => {
        const student: any = await StudentModel.findById(studentId)
        return student;
    }

    deleteStudent = async (studentId: string): Promise<void> => {
        await StudentModel.findByIdAndDelete(studentId);
    }

    showAllStudent = async (page: number, limit: number, search?: string, filter?: string, startDate?: string, endDate?: string, sort?: Record<string, 1 | -1>): Promise<IStudents[]> => {
        let pipeline: any[] = [];
        let matchObject: any = {};

        if (search) {
            const searchConditions: any[] = [
                { name: { $regex: search, $options: "i" } },
                { major: { $regex: search, $options: "i" } }
            ];

            matchObject.$or = searchConditions;
        }

        if (filter) {
            matchObject["major"] = {
                $regex: filter, $options: "i"
            }
        }

        if (startDate && endDate) {
            matchObject.enrollmentDate = { $gte: new Date(startDate) };
            matchObject.enrollmentDate = { $lte: new Date(endDate) }
        }


        if (Object.keys(matchObject).length > 0) {
            pipeline.push({ $match: matchObject })
        }

        if (sort) {
            pipeline.push({ $sort: sort })
        }
        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        )

        const result = await StudentModel.aggregate(pipeline);
        return result;
    }

    findStudentByEmail = async (email: string): Promise<IStudents> => {
        const student: any = await StudentModel.findOne({ email: email });
        return student
    }

}

export default new Student();