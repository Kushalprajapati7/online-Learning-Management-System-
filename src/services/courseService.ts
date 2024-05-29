import CourseModel from "../models/CourseModel";
import { ICourse } from "../interface/CoursesInterface";
import { pipe } from "pdfkit";

class CourseServices {
    createCourse = async (courseData: ICourse): Promise<ICourse> => {
        const newCourse = new CourseModel(courseData);
        return await newCourse.save();
    }

    updateCourse = async (courseId: string, courseData: ICourse): Promise<ICourse> => {
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, courseData, { new: true })
        if (!updatedCourse) {
            throw new Error('Course not found');
        }
        return updatedCourse;
    }

    couresById = async (couresId: string): Promise<ICourse> => {
        const course: any = await CourseModel.findById(couresId);
        return course
    }

    deleteCourse = async (couresId: string): Promise<void> => {
        await CourseModel.findByIdAndDelete(couresId);
    }

    allCourseByInstructor = async (instructorId: string): Promise<ICourse[]> => {
        return await CourseModel.find({ instructorID: instructorId })
    }

    listOfAllCourses = async (): Promise<ICourse[]> => {
        return await CourseModel.find();
    }

    getCourse = async (page: number, limit: number, search?: string, filter?: string, sort?: Record<string, 1 | -1>, startDate?: string, endDate?: string): Promise<ICourse[]> => {

        let pipeline: any[] = [];
        let matchObject: any = {};

        if (search) {
            const searchNumber = Number(search);
            const searchConditions: any[] = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                ...(isNaN(searchNumber) ? [] : [{ duration: searchNumber }])
            ];

            matchObject.$or = searchConditions;
        }

        if (startDate && endDate) {
            matchObject.startDate = { $gte: new Date(startDate) };
            matchObject.endDate = { $lte: new Date(endDate) };

        }

        if (Object.keys(matchObject).length > 0) {
            pipeline.push({ $match: matchObject })
        }


        if (sort) {
            pipeline.push({ $sort: sort });
        }

        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        )

        const result = await CourseModel.aggregate(pipeline);
        return result;
    }



}

export default new CourseServices()