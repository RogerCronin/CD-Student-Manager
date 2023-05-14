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
            const allStudents = await getAllStudents()
            if(!Array.isArray(allStudents)) {
                alert("wadda heck")
                navigate("/login")
            }
            setStudents(await getAllStudents())
        })()
    }, [navigate])

    const callUpdateStudent = async (id, newStudent) => {
        const res = await updateStudent(id, newStudent)
        if(!res) return false
        setStudents(students.map(student => student.id === id ? res : student))
        return res
    }

    const callDeleteStudent = async id => {
        if(await deleteStudent(id)) {
            setStudents(students.filter(student => student.id !== id))
        }
    }

    const callCreateStudent = async student => {
        const res = await createStudent(student)
        if(!res) return false
        setStudents([...students, res])
        return res
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
                                saveUpdate={newStudent => callUpdateStudent(student.id, newStudent)}
                                deleteStudent={() => callDeleteStudent(student.id)}
                            />
                        })
                    }
                    <Student
                        saveUpdate={newStudent => callCreateStudent(newStudent)}
                        isAddRow={true}
                    />
                </tbody>
            </table>
        </div>
    )
}