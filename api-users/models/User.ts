import mongoose from "mongoose";
import db from "./mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {type: String, required: false},
  // strings in MongoDB have unlimited length => 16Mo
  description: {type: String, required: false},
  role_id: { type: Number, required: true }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

const UserModel = db.model("User", userSchema);
export default UserModel;