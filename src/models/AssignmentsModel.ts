import mongoose, { Schema } from "mongoose";
import { IAssignments } from "../interface/AssignmentsInterface";

const AssignmentsSchema = new Schema(
    {
        courseId: {type:Schema.Types.ObjectId, ref:'Course', required:true},
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: {type:Date, required:true}

    },
    {
        timestamps:true
    }
)

const AssignmentModel = mongoose.model<IAssignments>('Assignment', AssignmentsSchema)

export default AssignmentModel;