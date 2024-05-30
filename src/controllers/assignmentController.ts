import { IAssignments } from "../interface/AssignmentsInterface";
import assignmentServices from "../services/assignmentServices";
import { NextFunction, Request, Response } from "express";
import courseService from "../services/courseService";
import CustomRequest from "../types/customRequest";
class AssignmentConroller {
  addAssignment = async (req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const assignmentData: IAssignments = req.body;
      const instructor = (req as CustomRequest).userId;

      const courseId = assignmentData.courseId;

      const course = await courseService.couresById(courseId?.toString());

      if (!course) {
        res
          .status(404)
          .json({ message: "You can't add assignment in this courese" });
        return;
      }
      const instructorId = course.instructorID;
      if (instructor === instructorId.toString()) {
        const newAssignment = await assignmentServices.createAssignment(
          assignmentData
        );
        res.status(201).json({ message: "Assignment Added !", newAssignment });
      } else {
        res
          .status(404)
          .json({ message: "You can't add assignment in this courese." });
        return;
      }
    } catch (error) {
      next(error);
    }
  };

  updateAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const assignmentId = req.params.id;
      const assignmentData: IAssignments = req.body;
      const instructor = (req as CustomRequest).userId;

      const courseId = assignmentData.courseId;
      const course = await courseService.couresById(courseId?.toString());
      if (!course) {
        res
          .status(404)
          .json({ message: "You can't add assignment for this courese" });
        return;
      }

      const instructorId = course.instructorID;
      if (instructor === instructorId.toString()) {
        const newAssignment = await assignmentServices.updateAssignment(
          assignmentId,
          assignmentData
        );
        res
          .status(201)
          .json({ message: "Assignment updated !", newAssignment });
      } else {
        res
          .status(404)
          .json({ message: "You can't update assignment for this courese." });
        return;
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const assignmentId = req.params.id;

      const assignment = await assignmentServices.assignmentById(assignmentId);
      if (!assignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }

      const instructor = (req as CustomRequest).userId;

      const courseId = assignment.courseId;

      const course = await courseService.couresById(courseId?.toString());
      if (!course) {
        res
          .status(404)
          .json({ message: "You can't add assignment for this courese" });
        return;
      }
      const instructorId = course.instructorID;
      if (instructor === instructorId.toString()) {
        await assignmentServices.deleteAssignment(assignmentId);
        res.status(201).json({ message: "Assignment Deleted !" });
      } else {
        res
          .status(404)
          .json({ message: "You can't update assignment for this courese." });
        return;
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AssignmentConroller();
