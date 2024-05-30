import { ICourse } from "../interface/CoursesInterface";
import courseService from "../services/courseService";
import { NextFunction, Request, Response } from "express";
import CustomRequest from "../types/customRequest";
import { Types } from "mongoose";

class CourseController {
    createCourse = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        try {
            const courseData: ICourse = req.body;
            const instructorId = (req as CustomRequest).userId;

            courseData.instructorID = new Types.ObjectId(instructorId);

            const newCourse = await courseService.createCourse(courseData);
            res.status(201).json({ message: "Course Added !", newCourse })

        } catch (error) {
            next(error)

        }
    }

    updateCourse = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        try {
            const couresId = req.params.id;
            const instructorId = (req as CustomRequest).userId;
            const courseData: ICourse = req.body;

            const course = await courseService.couresById(couresId);
            if (!course) {
                res.status(404).json({ message: "Course Not Found !" })
                return
            }

            if (course.instructorID.toString() === instructorId) {
                const updateCourse = await courseService.updateCourse(couresId, courseData)
                res.status(200).json({ message: "Course updated !", updateCourse })
            }
            else {
                res.status(404).json({ message: "Course not found for this instuctor ! " })
            }

        } catch (error) {
next(error)
        }
    }

    deleteCourse = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        try {
            const couresId = req.params.id;
            const instructorId = (req as CustomRequest).userId;

            const course = await courseService.couresById(couresId);
            if (!course) {
                res.status(404).json({ message: "Course Not Found !" })
                return
            }

            if (course.instructorID.toString() === instructorId) {
                await courseService.deleteCourse(couresId)
                res.status(200).json({ message: "Course Deleted !", });
            }
            else {
                res.status(404).json({ message: "Course not found for this instuctor ! " })
            }
        } catch (error) {
            next(error)

        }
    }

    coursesByInstructor = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        try {
            const instructorId = (req as CustomRequest).userId;
            if (!instructorId) {
                res.status(404).json({ message: "Instuctor Not Found ! " })
                return
            }
            const courses = await courseService.allCourseByInstructor(instructorId);
            if (courses.length === 0) {
                res.status(404).json({ message: "You Don't Have Any Courses ! " })
                return
            }
            res.status(200).json({ message: "List Of Courses !", courses });


        } catch (error) {
            next(error)

        }
    }

    allCourse = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        try {
            const allCourse = await courseService.listOfAllCourses();
            res.status(200).json({ message: "List Of Courses !", allCourse });

        } catch (error) {
            next(error)
        }
    }

    getCourse = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        try {
            const { page, limit, search, filter, sort,startDate, endDate } = req.query;
            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 1;
            let sortObject: Record<string, 1 | -1> | undefined;
            if (sort) {
                sortObject = JSON.parse(sort as string);
            }
            
            const instructor = await courseService.getCourse(pageNumber, limitNumber, search as string,filter as string,sortObject, startDate as string, endDate as string );

            res.status(200).json(instructor)
        } catch (error) {
            next(error)
        }
    }

}

export default new CourseController();