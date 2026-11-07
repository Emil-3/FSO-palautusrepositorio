import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (receivedToken) => {
  token = `Bearer ${receivedToken}`
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObject => {
  return (await axios.post(baseUrl, blogObject, { headers: { Authorization: token } })).data
}

export default { getAll, create, setToken, removeToken }