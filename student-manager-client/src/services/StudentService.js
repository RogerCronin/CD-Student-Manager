import { appUrl } from "./GlobalVariables"
import { getToken } from "./AuthService"

async function getAllStudents() {
    const res = await fetch(appUrl + "/api/v1/students", {
        method: "GET",
        headers: {
            "token": getToken()
        }
    })
    return await res.json()
}

async function createStudent(student) {
    const res = await fetch(appUrl + "/api/v1/students", {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json",
            "token": getToken()
        }
    })
    return res.status === 201 ? await res.json() : false
}

async function getStudentById(id) {
    const res = await fetch(appUrl + "/api/v1/students/" + id, {
        method: "GET",
        headers: {
            "token": getToken()
        }
    })
    return await res.json()
}

async function updateStudent(id, student) {
    const res = await fetch(appUrl + "/api/v1/students/" + id, {
        method: "PUT",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json",
            "token": getToken()
        }
    })
    return res.status === 202 ? await res.json() : false
}

async function deleteStudent(id) {
    const res = await fetch(appUrl + "/api/v1/students/" + id, {
        method: "DELETE",
        headers: {
            "token": getToken()
        }
    })
    return res.status === 200
}

function gradeToString(grade) {
    switch(grade) {
        case 0:
            return "0th (0)"
        case 1:
            return "1st (1)"
        case 2:
            return "2nd (2)"
        case 3:
            return "3rd (3)"
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            return grade + "th (" + grade + ")"
        case 9:
            return "Freshman HS (9)"
        case 10:
            return "Sophomore HS (10)"
        case 11:
            return "Junior HS (11)"
        case 12:
            return "Senior HS (12)"
        case 13:
            return "Freshman CL (13)"
        case 14:
            return "Sophomore CL (14)"
        case 15:
            return "Junior CL (15)"
        case 16:
            return "Senior CL (16)"
        default:
            if(grade > 16) return "Graduate Student (" + grade + ")"
            return "Other (" + grade + ")"
    }
}

export {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    gradeToString
}