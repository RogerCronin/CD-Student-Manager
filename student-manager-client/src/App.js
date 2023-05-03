import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginHold from "./pages/LoginHold"
import Login from "./pages/Login"
import NoContent from "./pages/NoContent"

import "./App.scss"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginHold/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NoContent/>}/>
            </Routes>
        </BrowserRouter>
    )
}