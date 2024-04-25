import express from "express"
import employee from "../model/employee.js"
import project from "../model/project.js"
import projectAssignment from "../model/projectAssignment.js"

const router = express.Router()

router.get('/assignments', async (req, res) => {
    try {
        const details = await projectAssignment.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employee_id',
                    foreignField: 'employee_id',
                    as: 'e_details'
                }
            },
            {
                $unwind: {
                    path: '$e_details',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project_code',
                    foreignField: 'project_code',
                    as: 'p_details'
                }
            },
            {
                $unwind: {
                    path: '$p_details',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    employee_id: 1,
                    full_name: '$e_details.full_name',
                    project_name: '$p_details.project_name',
                    start_date: 1
                }
            }
        ]);
        
        res.status(200).json(details)
    } catch (error) {
        res.status(500).json({ message: 'Could not find users.', error})
    }
})

router.post("/employee", async (req, res) => {
    const { employee_id, full_name, email, password } = req.body

    try {
        const currEmployee = await employee.findOne({ employee_id });
        if (currEmployee) {
            return res.status(400).json({ message: `employee with id: ${ employee_id } does already exist.`});
        }
        const newEmployee = new employee({
            employee_id,
            full_name,
            email,
            password
        });

        await newEmployee.save();
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(500).json({ message: 'Could not create user, Please try again.' })
    }
});

router.post("/project", async (req, res) => {
    const { project_code, project_name, project_description } = req.body;

    try {
        const currProject = await project.findOne({ project_code });
        if (currProject) {
            return res.status(400).json({ message: `project: ${ project_code } already exists.` });
        }
        const newProject = new project({
            project_code,
            project_name,
            project_description
        });

        await newProject.save();
        res.status(201).json(newProject)
    }   catch (error) {
        res.status(500).json({ message: 'Could not create project, Please try again.' })
    }
});

router.post("/project_assignments", async (req, res) => {
    const { employee_id, project_code, start_date } = req.body;

    try {
        const currAssignment = await projectAssignment.findOne({ employee_id, project_code })
        if (currAssignment) {
            return res.status(400).json({ message: `Project Assigntment with ${ employee_id } and ${ project_code } already exists.`})
        }
        const newAssignment = new projectAssignment({
            employee_id, 
            project_code, 
            start_date
        });

        await newAssignment.save();
        res.status(201).json(newAssignment)
    }   catch (error) {
        res.status(500).json(' Could not create project assigntment, Please try again.' + error)
    }
})

export default router;