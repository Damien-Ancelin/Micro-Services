import mongoose from "mongoose";
import db from "./mongoose";
import type { PostOutOfBdd } from "../../@types";

const postSchema = new mongoose.Schema<PostOutOfBdd>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: false },
  user_id: { type: String, required: true }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

const PostModel = db.model("Post", postSchema);
export default PostModel;