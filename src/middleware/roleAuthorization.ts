// src/middleware/roleAuthorization.ts
import { Request, Response, NextFunction } from 'express';
import { IInstructors } from '../interface/InstructorsInterface';
import { IStudents } from '../interface/StudentsInterface';
import CustomRequest from '../types/customRequest';

export const authorizeInstructor = (req: Request, res: Response, next: NextFunction) => {
  const role = (req as CustomRequest).role;
  if (role === 'instructor') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized. Only instructors are allowed.' });
  }
};

export const authorizeStudent = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as CustomRequest).role;

  if (role  === 'student') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized. Only students are allowed.' });
  }
};
