export default function Main() {
    const token = sessionStorage.getItem("token")

    console.log(token)

    return (
        <div>
            <h1>Hello!</h1>
            <p>Logged in as {token.email}</p>
        </div>
    )
}