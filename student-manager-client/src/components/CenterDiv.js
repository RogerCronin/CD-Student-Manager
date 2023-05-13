import "./CenterDiv.scss"

export function CenterDiv({ vertical, children }) {
    return (
        <div className="CenterDiv" style={{ height: vertical ? "100vh" : "" }}>
            {children}
        </div>
    )
}