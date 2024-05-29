import { Request, Response, NextFunction } from "express";
import studentsServices from "../services/studentsServices";
import { IStudents } from "../interface/StudentsInterface";
import StudentModel from "../models/StudentsModel";
import CustomRequest from "../types/customRequest";
import { Types } from "mongoose";
import randomstring from 'randomstring';

class StudentController {
    createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const studentData: IStudents = req.body;
            const student = await studentsServices.findStudentByEmail(studentData.email);
            
            if (student) {
                res.status(409).json({ message: "Student Already Exits !" })
                return
            }
            const newStudent = await studentsServices.createStudents(studentData);

            res.status(201).json({ message: "Student Created !", newStudent })
        } catch (error) {
            next(error)

        }
    }

    showStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page, limit, search, filter, startDate, endDate, sort } = req.query;
            const pageNumber = Number(page) || 1;
            const limitNuber = Number(limit) || 10;
            const searchString = search as string || '';
            const filterString = filter as string || "";
            let sortObject: Record<string, 1 | -1> | undefined;

            if (sort) {
                sortObject = JSON.parse(sort as string);
            }

            const student = await studentsServices.showAllStudent(pageNumber, limitNuber, searchString, filterString, startDate as string, endDate as string, sortObject);
            if (student.length === 0) {
                res.status(404).json({ message: "Students Not Found !" })
                return

            }
            res.status(200).json({ message: `List of students ! ${student.length}`, student })

        } catch (error) {
            next(error)


        }
    }

    updatedStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        } catch (error) {
            next(error)
        }
    }

    deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        } catch (error) {
            next(error)


        }
    }

    showStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentsServices.showStudentById(studentId);
            if (!student) {
                res.status(404).json({ message: "Student Not Found !" })
                return

            }
            res.status(200).json({ message: `Student with Id ${studentId}`, student })

        } catch (error) {
            next(error)
        }
    }



}


export default new StudentController();