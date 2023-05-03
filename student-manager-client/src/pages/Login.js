import { useNavigate } from "react-router-dom"
import { login } from "../services/AuthService"

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const res = await login(email, password)
        if(res.success) {
            navigate("/")
        } else {
            alert(res.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                email
                <input id="email"></input>
                password
                <input id="password"></input>
                <button onClick={handleSubmit}>Click me!</button>
            </form>
        </div>
    )
}