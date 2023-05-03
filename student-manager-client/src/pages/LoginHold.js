import { useState } from "react"
import Main from "./Main"

export default function LoginHold() {
    const [loggedIn, setLoggedIn] = useState(false)

    if(loggedIn) return <Main/>

    return (
        <div>
            <h1>Logging in...</h1>
        </div>
    )
}