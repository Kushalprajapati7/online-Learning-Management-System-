import mongoose, { Schema, Types } from "mongoose";
import { IInstructors } from "../interface/InstructorsInterface";
import Role from "./RoleModel";

const InstructorsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Please enter name with at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters long"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["instructor"],
        message: "{VALUE} is not supported",
      },
    },
    profile: {
      type: [Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

InstructorsSchema.pre("save", async function (next) {
  const roles = await Role.findOne({ role: this.role });
  if (roles) {
    this.profile.push(roles._id);
    next();
  }
  throw new Error("this is not valid role");
});

const InstructorsModel = mongoose.model<IInstructors>(
  "Instructor",
  InstructorsSchema
);
export default InstructorsModel;
