import mongoose, { Types } from "mongoose";

export interface IEnrollment {
    _id?: Types.ObjectId;
    courseID: Types.ObjectId;
    studentID: Types.ObjectId;
    enrollmentDate: Date;
    status: 'Enrolled' | 'Completed' | 'Dropped';
}