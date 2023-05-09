import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, logout } from "../services/AuthService"
import { CenterDiv } from "../components/CenterDiv"
import { Label } from "../components/Label"

import "./LoginForm.scss"

export function LoginForm() {
    const [alertText, setAlertText] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        logout()
    })

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await login(email, password)
        if(res.success) {
            navigate("/")
        } else {
            setAlertText(res.message)
        }
    }

    return (
        <div className="LoginForm">
            <CenterDiv>
                <div className="wrapper">
                    <Label color="blue">
                        <h1>CD Student Manager</h1>
                    </Label>
                    <div className="alert" style={{ display: alertText ? "block" : "none" }}>{alertText}</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                        <input type="submit" value="Login"></input>
                    </form>
                </div>
            </CenterDiv>
        </div>
    )
}