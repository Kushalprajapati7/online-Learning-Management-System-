import mongoose, { Types } from "mongoose";

export interface IStudents {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password:string;
    major: string;
    enrollmentDate: Date;
    role:'student';
}