import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        employee_id: { type: String, required: true, unique: true },
        project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true},
        start_date: { type: Date, required: true}
    }
)

export default mongoose.model("project Assignment", assignmentSchema)