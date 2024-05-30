import { Request, Response, NextFunction } from "express";
import PermissionModel from "../models/PermissionModel";
import ModuleModel from "../models/moduleModel";
import { Types } from "mongoose";

declare module "express" {
    interface Request {
        email?: string;
        userId?: string;
        roleId?: string;
        profiles?: Types.ObjectId[];
    }
}

const Permission = (role: string[], module: string, name: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const modules = await ModuleModel.findOne({ name: module });
            const moduleId = modules?._id;

            let permissions;

            // permisson = await PermissionModel.findOne({roleId:{$in:[...req.profiles!]},moduleId,write:true})
            if (name === "write") {
                permissions = await PermissionModel.findOne({
                    roleId: { $in: [...req.profile!] },
                    moduleId,
                    write: true,
                });
                console.log('write', permissions);

            } else if (name === "delete") {
                permissions = await PermissionModel.findOne({
                    roleId: { $in: [...req.profile!] },
                    moduleId,
                    delete: true,
                });
                console.log('delete', permissions);

            } else if (name === "edit") {
                permissions = await PermissionModel.findOne({
                    roleId: { $in: [...req.profile!] },
                    moduleId,
                    edit: true,
                });
                console.log('edit', permissions);

            } else {
                permissions = await PermissionModel.findOne({
                    roleId: { $in: [...req.profile!] },
                    moduleId,
                    read: true,
                });
                console.log('delete', permissions);

            }

            if (!permissions) {
                res
                    .status(403)
                    .json({ error: "permission for your role is not defined!" });
                return;
            } else {
                next();
            }
        } catch (error) {
            res
                .status(403)
                .json({ error: "permission for your role is not defined!" });
        }
    };
};

export default Permission;
