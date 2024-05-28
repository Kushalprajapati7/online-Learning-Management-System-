import CourseModel from "../models/CourseModel";
import { ICourse } from "../interface/CoursesInterface";

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
        return await CourseModel.find({instructorID:instructorId})
    }

    listOfAllCourses = async():Promise<ICourse[]> => {
        return await CourseModel.find();
    }


}

export default new CourseServices()