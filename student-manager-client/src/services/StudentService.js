import { appUrl } from "./GlobalVariables"
import { getToken } from "./AuthService"

/**
 * Fetches the list of all students.
 * 
 * @returns {Student[]} list of all students
 */
async function getAllStudents() {
    const res = await fetch(appUrl + "/api/v1/students", {
        method: "GET",
        headers: {
            "token": getToken()
        }
    })
    return await res.json()
}

/**
 * Persists a student in the database.
 * 
 * @param {Student} student information in Student form
 * @returns {Student}       Student returned from the database with ID
 */
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

/**
 * Returns one student from the database with matching ID.
 * 
 * @param {string} id ID of student in database
 * @returns {Student} student matching that ID
 */
async function getStudentById(id) {
    const res = await fetch(appUrl + "/api/v1/students/" + id, {
        method: "GET",
        headers: {
            "token": getToken()
        }
    })
    return await res.json()
}
/**
 * Persists changes to a student in the database.
 * 
 * @param {string} id       ID of student in database
 * @param {Student} student new student information you want persisted
 * @returns {Student}       the result of database persistence with changes
 */
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

/**
 * Deletes a student from the database.
 * 
 * @param {string} id ID of student in database
 * @returns {boolean} whether the deletion was a success or not
 */
async function deleteStudent(id) {
    const res = await fetch(appUrl + "/api/v1/students/" + id, {
        method: "DELETE",
        headers: {
            "token": getToken()
        }
    })
    return res.status === 200
}

/**
 * Converts numerical grades to grade names.
 * 
 * @param {number} grade grade level in integer representation
 * @returns {string}     grade level in string representation
 */
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