import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { appUrl } from "./GlobalVariables"

const auth = getAuth()

/**
 * Attempts to log in user with provided email and password.
 * Automatically sets email and session token into sessionStorage.
 * 
 * @param {string} email      email to log in with
 * @param {string} password   password to log in with
 * @returns {SuccessResponse} success response depending on whether information was valid
 */
async function login(email, password) {
    try {
        // sign in with Firebase library
        const { _tokenResponse } = await signInWithEmailAndPassword(auth, email, password)
        sessionStorage.setItem("token", _tokenResponse.idToken)
        sessionStorage.setItem("email", _tokenResponse.email)
        return { // return successful response
            success: true,
            message: ""
        }
    } catch(e) {
        // matches error codes with output error messages
        let message
        switch(e.code) {
            case "auth/invalid-email":
                message = "Invalid email was given"
                break
                case "auth/missing-password":
                    message = "Invalid password was given"
                    break
            case "auth/user-not-found":
                message = "User was not found"
                break
            case "auth/wrong-password":
                message = "Incorrect password was given"
                break
            default:
                message = "An unknown error occurred"
        }
        return { // return unsuccessful response
            success: false,
            message: message
        }
    }
}

/**
 * Returns true or false depending if logged in or not.
 * 
 * @returns {boolean} whether the user is logged in
 */
async function isLoggedIn() {
    const token = getToken()
    if(!token) return false // if token doesn't exist, not logged in
    try {
        // return if token is valid or not
        const res = await fetch(appUrl + "/api/v1/auth/" + token)
        const json = await res.json()
        return json.success;
    } catch(ex) {
        // if an error occurs, default to not logged in
        console.error("Error validating token")
        console.error(ex)
        return false;
    }
}

/**
 * Logs out of the application.
 */
async function logout() {
    sessionStorage.clear()
}

/**
 * Returns the session token or null if there isn't one.
 * 
 * @returns {string} the session token
 */
function getToken() {
    const token = sessionStorage.getItem("token")
    return token ? token : null
}

/**
 * Returns the session email or null if there isn't one.
 * 
 * @returns {string} the session email
 */
function getEmail() {
    const email = sessionStorage.getItem("email")
    return email ? email : null
}

export {
    login,
    isLoggedIn,
    logout,
    getToken,
    getEmail
}