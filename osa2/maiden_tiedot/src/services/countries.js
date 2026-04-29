import axios from 'axios'

const coreURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const receiveEvery = () => {
    return axios.get(`${coreURL}/all`).then(reply => reply.data)
}

export default receiveEvery