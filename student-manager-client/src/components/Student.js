export function Student({ firstName, lastName, grade, age, email, school }) {
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{grade}</td>
            <td>{age}</td>
            <td><a href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a></td>
            <td>{school}</td>
            <td>✏️</td>
        </tr>
    )
}