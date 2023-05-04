import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from "../services/AuthService" 
import Main from "./Main"

export default function LoginHold() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await isLoggedIn()
            setLoggedIn(res)
            if(!res) navigate("/login")
        })()
    }, [setLoggedIn, navigate])

    if(loggedIn) return <Main/>

    return (
        <div>
            <h1>Logging in...</h1>
        </div>
    )
}