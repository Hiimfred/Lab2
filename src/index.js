import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

const AssignmentsT = () => {
    const [assignments, setAssignments] = useState([]);


    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/assignments');
                if (!response.ok) {
                    console.error('Problem fetching data. ', error)
            }
            const data = await response.json();
            setAssignments(data);
        } catch (error){
            console.error('Error fetching data:', error)
        }
    };
        fetchAssignments();

        const intervalID = setInterval(() => {
            fetchAssignments()}, 60000)
        return () =>  clearInterval(intervalID)
}, [])

return (
    <section id="index">
        <table>
            <thead>
                <tr>
                <th> ID</th>
                <th> Name</th>
                <th> Project</th>
                <th> Start Date</th>
                </tr>
            </thead>

            <tbody>
                {assignments.map(assignment => (
                    <tr key ={assignment._id}>
                        <td> {assignment.employee_id}</td>
                        <td> {assignment.full_name}</td>
                        <td> {assignment.project_name}</td>
                        <td> {new Date(assignment.start_date).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table> 
    </section>
    );
}

export default AssignmentsT;
ReactDOM.render(<AssignmentsT/>, document.getElementById("index"));
