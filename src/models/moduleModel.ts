import mongoose, { Types } from "mongoose";

export interface IModule extends Document{
    _id?:Types.ObjectId;
    name:string
}

const ModuleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true});

const ModuleModel =  mongoose.model<IModule>('Module', ModuleSchema);
export default ModuleModel;