import mongoose, { Types } from "mongoose";

export interface IInstructors{
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password:string;
    bio:string;
    Department:string;
    role:'instructor'
}

