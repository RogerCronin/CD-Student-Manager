import { useState, useEffect } from "react"
import { gradeToString } from "../services/StudentService"
import "./Student.scss"

export function Student({
    firstName,
    lastName,
    grade,
    age,
    email,
    school,
    saveUpdate,
    deleteStudent,
    isAddRow,
    id
}) {
    const [state, setState] = useState(0)
    const [_firstName, _setFirstName] = useState(firstName ? firstName : "")
    const [_lastName, _setLastName] = useState(lastName ? lastName : "")
    const [_grade, _setGrade] = useState(grade ? grade : 0)
    const [_age, _setAge] = useState(age ? age : 0)
    const [_email, _setEmail] = useState(email ? email : "")
    const [_school, _setSchool] = useState(school ? school : "")

    useEffect(() => {
        if(isAddRow) setState(-1)
    }, [isAddRow])

    const cancel = () => {
        if(!isAddRow) {
            _setFirstName(firstName)
            _setLastName(lastName)
            _setGrade(grade)
            _setAge(age)
            _setEmail(email)
            _setSchool(school)
            setState(0)
        } else {
            _setFirstName("")
            _setLastName("")
            _setGrade(0)
            _setAge(0)
            _setEmail("")
            _setSchool("")
            setState(-1)
        }
    }

    const saveEdit = async () => {
        const res = await saveUpdate({
            firstName: _firstName,
            lastName: _lastName,
            grade: _grade,
            age: _age,
            email: _email,
            school: _school
        })
        if(res) {
            if(isAddRow) return cancel()
            _setFirstName(res.firstName)
            _setLastName(res.lastName)
            _setGrade(res.grade)
            _setAge(res.age)
            _setEmail(res.email)
            _setSchool(res.school)
            setState(0)
        } else {
            alert("error!")
        }
    }

    switch(state) {
        case 0:
        case 2:
            return (
                <tr className="Student">
                    <td>{_firstName}</td>
                    <td>{_lastName}</td>
                    <td>{gradeToString(_grade)}</td>
                    <td>{_age}</td>
                    <td><a href={`mailto:${_email}`} target="_blank" rel="noreferrer">{_email}</a></td>
                    <td>{_school}</td>
                    {
                        state === 0 ? (
                            <td className="actions">
                                <span onClick={() => setState(1)}>✏️</span> <span onClick={() => setState(2)}>🗑️</span>
                            </td>
                        ) : (
                            <td className="actions">
                                <span onClick={() => deleteStudent()}>✔️</span> <span onClick={() => cancel()}>❌</span>
                            </td>
                        )
                    }
    
                </tr>
            )
        case 1:
            return (
                <tr className="Student">
                    <td>
                        <input
                            type="text"
                            value={_firstName}
                            onChange={e => _setFirstName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={_lastName}
                            onChange={e => _setLastName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            list="student-grade-datalist"
                            value={_grade}
                            onChange={e => _setGrade(e.target.value)}
                            autoComplete="new-password"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={_age}
                            onChange={e => _setAge(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={_email}
                            onChange={e => _setEmail(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={_school}
                            onChange={e => _setSchool(e.target.value)}
                        />
                    </td>
                    <td className="actions">
                        <span onClick={() => saveEdit()}>💾</span> <span onClick={() => cancel()}>❌</span>
                    </td>
                </tr>
            )
        case -1:
            return (
                <tr className="Student">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="actions">
                        <span onClick={() => setState(1)}>➕</span>
                    </td>
                </tr>
            )
        default:
            return <h1>Error displaying table : invalid state</h1>
    }
}