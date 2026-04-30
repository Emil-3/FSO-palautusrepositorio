import axios from 'axios'
const api_key = import.meta.env.VITE_KEY
const coreURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const receiveEvery = () => {
    return axios.get(`${coreURL}/all`).then(reply => reply.data)
}

const receiveWeatherOfCapital = (country) => {
    return axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
      .then(reply =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${reply.data[0].lat}&lon=${reply.data[0].lon}&units=metric&appid=${api_key}`))
      .then(reply => reply.data)
}

export default { receiveEvery, receiveWeatherOfCapital }