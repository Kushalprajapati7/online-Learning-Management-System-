import mongoose, { Schema } from "mongoose";
import { IAssignments } from "../interface/AssignmentsInterface";

const AssignmentsSchema = new Schema(
    {
        courseId: {
            type:Schema.Types.ObjectId, 
            ref:'Course', 
            required:[true, "Course Id is required"]
        },
        title: { 
            type: String, 
            required: [true, "Assignment Title is required"],
            minlength: [5, "Assignment Title must be at least 5 characters"]
        },
        description: { 
            type: String, 
            required: [true, "Assignment Description is required"] 
        },
        dueDate: {
            type:Date, 
            required:[true, "Assignment Due Date is required"],
            validate: {
                validator: function(value: Date) {
                    return value > new Date();
                },
                message: "Due Date must be in the future"
            }
        }

    },
    {
        timestamps:true
    }
)

const AssignmentModel = mongoose.model<IAssignments>('Assignment', AssignmentsSchema)

export default AssignmentModel;