import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(person => RegExp(`(.*)${filter.toLowerCase()}(.*)`).test(person.name.toLowerCase()))

  useEffect(() => {
    personService
      .receiveEvery()
      .then(startPersons => {
        setPersons(startPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (event) => {
    if (!window.confirm(`Delete ${event.target.name} ?`)) {
      return
    }
    personService.remove(event.target.id)
    setPersons(persons.filter(person => person.id !== event.target.id))
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = { name: newName, number: newNumber }
    personService
      .generate(personObject)
      .then(receivedPerson => {
        setPersons(persons.concat(receivedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App