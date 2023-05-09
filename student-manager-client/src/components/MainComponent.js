import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Label } from "./Label"
import { Student } from "./Student"

import "./MainComponent.scss"

export function MainComponent() {
    const navigate = useNavigate()

    const [students, setStudents] = useState([])
    const email = sessionStorage.getItem("email")

    useEffect(() => {
        setStudents([
            {
                id: 0,
                firstName: "Roger",
                lastName: "Cronin",
                grade: 13,
                age: 18,
                email: "rogermc@udel.edu",
                school: "University of Delaware"
            }
        ])
    }, [setStudents])

    return (
        <div className="Main">
            <Label color="blue">
                <h1>CD Student Manager</h1>
            </Label>
            <div className="login-actions">
                <p>Logged in as <b>{email}</b></p>
                <button onClick={() => navigate("/login")}>Logout</button>
            </div>
            <table border="1" frame="void" rules="rows">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Grade</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>School</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => {
                            return <Student
                                key={student.id}
                                {...student}
                            />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}