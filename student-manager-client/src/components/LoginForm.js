import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, logout } from "../services/AuthService"
import { CenterDiv } from "../components/CenterDiv"
import { Label } from "../components/Label"

import "./LoginForm.scss"

export function LoginForm() {
    const navigate = useNavigate()

    useEffect(() => {
        logout()
    })

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(e.target)
        const email = e.target.parentElement.children[0].value
        const password = e.target.parentElement.children[1].value

        const res = await login(email, password)
        if(res.success) {
            navigate("/")
        } else {
            alert(res.message)
        }
    }

    return (
        <div className="LoginForm">
            <CenterDiv>
                <div className="wrapper">
                    <Label color="blue">
                        <h1>Login</h1>
                    </Label>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Email"></input>
                        <input placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                    </form>
                </div>
            </CenterDiv>
        </div>
    )
}