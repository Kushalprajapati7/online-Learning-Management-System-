import mongoose,{Schema, Types} from "mongoose";

export interface IPermission{
    _id?:Types.ObjectId;
    moduleId:Types.ObjectId;
    roleId:Types.ObjectId;
    read:boolean;
    write:boolean;
    edit:boolean;
    delete:boolean;
}

const PermissionSchema = new mongoose.Schema({
    moduleId:{
        type:Types.ObjectId,
        ref:'Module',
        required:true
    },
    roleId:{
        type:Types.ObjectId,
        ref:'Role',
        required:true
    },
    read:{
        type:Boolean,
        required:true,
        default:false
    },
    write:{
        type:Boolean,
        required:true,
        default:false
    },
    edit:{
        type:Boolean,
        required:true,
        default:false,
    },
    delete:{
        type:Boolean,
        required:true,
        default:false
    }
})

const PermissionModel = mongoose.model<IPermission>('Permission', PermissionSchema);

export default PermissionModel;