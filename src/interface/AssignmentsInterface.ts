import mongoose, { Types } from "mongoose";

export interface IAssignments {
    _id?: Types.ObjectId;
    courseId: Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date
}