import { Request, Response } from "express";
import studentsServices from "../services/studentsServices";
import { IStudents } from "../interface/StudentsInterface";
import StudentModel from "../models/StudentsModel";
import CustomRequest from "../types/customRequest";
import { Types } from "mongoose";

class StudentController {
    createStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentData: IStudents = req.body;
            const newStudent = await studentsServices.createStudents(studentData);
            res.status(201).json({ message: "Student Created !", newStudent })
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    showStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const student = await studentsServices.showAllStudent();
            if (student.length === 0) {
                res.status(404).json({ message: "Students Not Found !" })
                return

            }
            res.status(201).json({ message: "List of students !", student })

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    updatedStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const studentData: IStudents = req.body;
            const instructorId = (req as CustomRequest).userId;

            if (!instructorId) {
                res.status(404).json({ message: "Instructor Not Found !" })
                return

            }

            const student = await studentsServices.showStudentById(studentId)
            if (!student) {
                res.status(404).json({ message: "Student Not Found !" })
                return

            }

            const updatedStudent = await studentsServices.updatedStudent(studentId, studentData, new Types.ObjectId(instructorId))
            res.status(200).json({ message: "Student updated !", updatedStudent })

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    deleteStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentsServices.showStudentById(studentId);
            const instructorId = (req as CustomRequest).userId;

            if (!student) {
                res.status(404).json({ message: "Student Not Found !" })
                return
            }
            await studentsServices.deleteStudent(studentId);
            res.status(200).json({ message: `Student Deleted by instuctor ${instructorId}` })

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    showStudentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentsServices.showStudentById(studentId);
            if (!student) {
                res.status(404).json({ message: "Student Not Found !" })
                return
            }
            res.status(200).json({ message: `Student with Id ${studentId}`, student })
            
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }

}


export default new StudentController();