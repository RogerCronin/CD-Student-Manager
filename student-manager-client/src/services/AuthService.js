import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth()

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        sessionStorage.setItem("token", userCredential._tokenResponse)
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
    // check if signed in here
    // https://firebase.google.com/docs/auth/admin/verify-id-tokens#java
    return true
}

export {
    login,
    isLoggedIn
}