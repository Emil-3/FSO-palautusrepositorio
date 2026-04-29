const Notification = ({ info, color }) => {
    const notificationStyle = {
        color: color,
        fontSize: '200%',
        border: `4px solid ${color}`,
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: 'rgb(210,210,210)',
        margin: '5px'
    }

    if (info === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {info}
        </div>
    )
}

export default Notification
