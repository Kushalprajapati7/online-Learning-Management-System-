import mongoose, { Types } from "mongoose";
export interface ICourse {
    _id?: Types.ObjectId;
    title: string
    description: string
    instructorID: Types.ObjectId;
    duration: number;
    startDate: Date
    endDate: Date
}