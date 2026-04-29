const Notification = ({ info }) => {
    const notificationStyle = {
        color: 'rgb(0,160,0)',
        fontSize: '200%',
        border: '4px solid rgb(0,160,0)',
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
