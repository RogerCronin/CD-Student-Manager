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
                alert("Unknown error; backend is possibly down")
                navigate("/login")
            }
            setStudents(await getAllStudents())
        })()
    }, [navigate])

    /**
     * Calls StudentService.updateStudent.
     * 
     * @param {string} id          ID of student in database
     * @param {Student} newStudent new student information you want persisted
     * @returns {Student}          the result of database persistence with changes
     */
    const callUpdateStudent = async (id, newStudent) => {
        const res = await updateStudent(id, newStudent)
        if(!res) return false
        setStudents(students.map(student => student.id === id ? res : student))
        return res
    }

    /**
     * Calls StudentService.deleteStudent.
     * 
     * @param {string} id ID of student in database
     */
    const callDeleteStudent = async id => {
        if(await deleteStudent(id)) {
            setStudents(students.filter(student => student.id !== id))
        }
    }

    /**
     * Calls StudentService.createStudent.
     * 
     * @param {Student} student information in Student form
     * @returns {Student}       Student returned from the database with ID
     */
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
                        id={0}
                        saveUpdate={newStudent => callCreateStudent(newStudent)}
                        isAddRow={true}
                    />
                </tbody>
            </table>
            <datalist id="student-grade-datalist">
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">Freshman HS (9)</option>
                <option value="10">Sophomore HS (10)</option>
                <option value="11">Junior HS (11)</option>
                <option value="12">Senior HS (12)</option>
                <option value="13">Freshman CL (13)</option>
                <option value="14">Sophomore CL (14)</option>
                <option value="15">Junior CL (15)</option>
                <option value="16">Senior CL (16)</option>
                <option value="17">Graduate Student (17)</option>
            </datalist>
        </div>
    )
}