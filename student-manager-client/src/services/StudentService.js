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

export {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}