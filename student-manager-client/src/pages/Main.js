export default function Main() {
    const email = sessionStorage.getItem("email")

    return (
        <div>
            <h1>Hello!</h1>
            <p>Logged in as {email}</p>
        </div>
    )
}