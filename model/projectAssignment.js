import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        employee_id: { type: String, ref: 'employee', required: true, unique: true },
        project_code: { type: String, ref: 'project', required: true},
        start_date: { type: Date, required: true}
    }
)

export default mongoose.model("project Assignment", assignmentSchema)