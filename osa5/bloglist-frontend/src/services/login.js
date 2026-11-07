import axios from 'axios'
const bUrl = '/api/login'

const login = async creds => {
    return (await axios.post(bUrl, creds)).data
}

export default { login }