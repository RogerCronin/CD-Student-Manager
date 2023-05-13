import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getEmail } from "../services/AuthService"
import { getAllStudents, updateStudent, deleteStudent, createStudent } from "../services/StudentService"
import { Label } from "./Label"
import { Student } from "./Student"

import "./MainComponent.scss"

export function MainComponent() {
    const navigate = useNavigate()

    const [students, setStudents] = useState([])
    const email = getEmail()

    useEffect(() => {
        (async function() {
            setStudents(await getAllStudents())
        })()
    }, [])

    const callUpdateStudent = async (id, newStudent) => {
        const res = await updateStudent(id, newStudent)
        if(!res) return false
        setStudents(students.map(student => student.id === id ? res : student))
        return res
    }

    const callDeleteStudent = async id => {
        return await deleteStudent(id)
    }

    const callCreateStudent = async student => {
        const res = await createStudent(student)
        if(!res) return false
        setStudents({ ...students, student })
        return await res.json()
    }

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
                                saveUpdate={
                                    student.id === -1 ? newStudent => {
                                        callCreateStudent(newStudent)
                                    } : newStudent => {
                                        callUpdateStudent(student.id, newStudent)
                                    }
                                }
                                deleteStudent={() => callDeleteStudent(student.id)}
                                defaultState={0}
                            />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}