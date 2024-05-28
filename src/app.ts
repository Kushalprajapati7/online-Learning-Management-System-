import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'
import connectDB from "./config/database";
import studentRoutes from './routes/studentRoutes'
import instructorRoutes from './routes/instructorRoutes'
import authroutes from './routes/authRoutes'
import courseRoutes from './routes/courseRoutes'
import enrollmentRoutes from './routes/enrollmentRoutes'
import assignmentRoutes from './routes/assignmentRoutes'

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/student', studentRoutes)
app.use('/api/instructor', instructorRoutes)
app.use('/api/login',authroutes)
app.use('/api/course',courseRoutes)
app.use('/api/enrollment',enrollmentRoutes)
app.use('/api/assignment',assignmentRoutes)


connectDB();

app.listen(port, ()=>{
    console.log(`server is On`);
    
})