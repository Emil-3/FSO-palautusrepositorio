import axios from 'axios'

const URL = 'http://localhost:3001/persons'

const receiveEvery = () => (
    axios
      .get(URL)
      .then(reply => reply.data)
)

const generate = newPerson => (
    axios
      .post(URL, newPerson)
      .then(reply => reply.data)
)

const remove = id => (
  axios
    .delete(`${URL}/${id}`)
)

const replace = personObject => (
  axios
    .put(`${URL}/${personObject.id}`, personObject)
    .then(reply => reply.data)
)

export default { receiveEvery, generate, remove, replace }