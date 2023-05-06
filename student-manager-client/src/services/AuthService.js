import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { appUrl } from "./GlobalVariables"

const auth = getAuth()

async function login(email, password) {
    try {
        const { _tokenResponse } = await signInWithEmailAndPassword(auth, email, password)
        sessionStorage.setItem("token", _tokenResponse.idToken)
        sessionStorage.setItem("email", _tokenResponse.email)
        return {
            success: true,
            message: ""
        }
    } catch(e) {
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
        return {
            success: false,
            message: message
        }
    }
}

async function isLoggedIn() {
    const token = sessionStorage.getItem("token")
    if(!token) return false
    try {
        const res = await fetch(appUrl + "/api/v1/auth/" + token)
        const json = await res.json()
        return json.success;
    } catch(ex) {
        console.error("Error validating token")
        console.error(ex)
        return false;
    }
}

async function logout() {
    sessionStorage.clear()
}

export {
    login,
    isLoggedIn,
    logout
}