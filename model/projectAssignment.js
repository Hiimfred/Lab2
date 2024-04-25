import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        employee_id: { type: String, required: true },
        project_code: { type: String, required: true },
        start_date: { type: Date, required: true }
    },
    {collection: "project assignment"}
)

export default mongoose.model("project Assignment", assignmentSchema)