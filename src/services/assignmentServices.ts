import AssignmentModel from "../models/AssignmentsModel";
import { IAssignments } from "../interface/AssignmentsInterface";

class AssignmentServices {
    createAssignment = async(assignmentData:IAssignments):Promise<IAssignments> =>{
        const assignment = new AssignmentModel(assignmentData);
        return await assignment.save();
    }

    updateAssignment = async(assignmentId:string,assignmentData:IAssignments):Promise<IAssignments> =>{
        const updatedAssignment:any = await AssignmentModel.findByIdAndUpdate(assignmentId, assignmentData, {new:true})
        return updatedAssignment
    } 

    assignmentById = async(assignmetId:string):Promise<IAssignments> =>{
        const assignment:any = await AssignmentModel.findById(assignmetId);
        return assignment
    }

    deleteAssignment = async(assignmetId:string):Promise<void> =>{
        await AssignmentModel.findByIdAndDelete(assignmetId);
    }

    getAllAssignments = async():Promise<IAssignments[]> =>{
        const assignments:any = await AssignmentModel.find();
        return assignments;
    }               

}

export default new AssignmentServices();