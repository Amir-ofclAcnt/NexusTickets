import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
