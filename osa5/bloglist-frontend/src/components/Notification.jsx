import { Alert } from '@mui/material'

const Notification = ({ message, color }) => {
  return (
    <Alert severity={color === 'green' ? 'success' : 'error'}>
      {message}
    </Alert>
  )
}

export default Notification