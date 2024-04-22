import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        project_code: { type: String, required: true, unique: true },
        project_name: { type: String, required: true },
        project_description: { type: String, required: true }
    }
)

export default mongoose.model("project", projectSchema)