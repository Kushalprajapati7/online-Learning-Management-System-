import mongoose, { Types } from "mongoose";
import Role from "./RoleModel";

export interface IAdmin {
  _id?: Types.ObjectId;
  name: string;
  role: "admin";
  email: string;
  password: string;
  profile: Types.ObjectId;
}

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin"],
      message: "{VALUE} is not supported",
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: [Types.ObjectId],
  },
});

AdminSchema.pre("save", async function (next) {
  const roles = await Role.findOne({ role: this.role });
  if (roles) {
    this.profile.push(roles._id);
    next();
  }
  throw new Error("this is not valid role");
});

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
export default AdminModel;