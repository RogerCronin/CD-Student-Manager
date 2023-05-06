import "./Label.scss"

export function Label({ color, children }) {
    color = `var(--color-${color})`

    return (
        <div className="Label" style={{ backgroundColor: color }}>
            {children}
        </div>
    )
}