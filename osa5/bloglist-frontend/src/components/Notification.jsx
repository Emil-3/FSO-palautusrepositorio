const Notification = ({ message, color }) => {
    const style = {
        border: `5px solid ${color}`,
        margin: '6px',
        color: color,
        padding: '11px',
        fontSize: '210%',
        borderRadius: '7px',
        backgroundColor: 'rgb(200,200,200)'
    }
    
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification