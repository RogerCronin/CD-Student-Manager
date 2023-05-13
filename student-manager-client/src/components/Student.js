import { useState } from "react"
import "./Student.scss"

export function Student({
    firstName,
    lastName,
    grade,
    birthdate,
    email,
    school,
    saveUpdate,
    deleteStudent,
    createStudent,
    defaultState
}) {
    const [state, setState] = useState(defaultState)
    const [_firstName, _setFirstName] = useState(firstName)
    const [_lastName, _setLastName] = useState(lastName)
    const [_grade, _setGrade] = useState(grade)
    const [_birthdate, _setBirthdate] = useState(birthdate)
    const [_email, _setEmail] = useState(email)
    const [_school, _setSchool] = useState(school)

    const timestampToAge = t => Math.floor((new Date().getTime() - t) / (1000 * 60 * 60 * 24 * 365))

    const cancel = () => {
        _setFirstName(firstName)
        _setLastName(lastName)
        _setGrade(grade)
        _setBirthdate(birthdate)
        _setEmail(email)
        _setSchool(school)
        setState(0)
    }

    const saveEdit = async () => {
        const res = await saveUpdate({
            firstName: _firstName,
            lastName: _lastName,
            grade: _grade,
            birthdate: _birthdate,
            email: _email,
            school: _school
        })
        if(res) {
            _setFirstName(res.firstName)
            _setLastName(res.lastName)
            _setGrade(res.grade)
            _setBirthdate(res.birthdate)
            _setEmail(res.email)
            _setSchool(res.school)
            setState(0)
        } else {
            alert("error!")
        }
    }

    if(state === 0) {
        return (
            <tr className="Student">
                <td>{_firstName}</td>
                <td>{_lastName}</td>
                <td>{_grade}</td>
                <td>{timestampToAge(_birthdate)}</td>
                <td><a href={`mailto:${_email}`} target="_blank" rel="noreferrer">{_email}</a></td>
                <td>{_school}</td>
                <td className="actions">
                    <span onClick={() => setState(1)}>✏️</span> <span>🗑️</span>
                </td>
            </tr>
        )
    } else if(state === 1) {
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
                        value={_grade}
                        onChange={e => _setGrade(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="date"
                        value={_birthdate}
                        onChange={e => _setBirthdate(e.target.value)}
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
    } else if(state === 2) {
        return (
            <tr className="Student">
                <td>{_firstName}</td>
                <td>{_lastName}</td>
                <td>{_grade}</td>
                <td>{timestampToAge(_birthdate)}</td>
                <td><a href={`mailto:${_email}`} target="_blank" rel="noreferrer">{_email}</a></td>
                <td>{_school}</td>
                <td className="actions">
                    <span onClick={() => deleteStudent()}>✔️</span> <span onClick={() => cancel()}>❌</span>
                </td>
            </tr>
        )
    }
}