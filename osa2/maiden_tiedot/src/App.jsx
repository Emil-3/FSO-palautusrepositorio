import { useState, useEffect } from 'react'
import receiveEvery from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    receiveEvery().then(countries => setCountries(countries))
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = () => (
    countries.filter(country => RegExp(`(.*)${filter.toLowerCase()}(.*)`).test(country.name.common.toLowerCase()))
  )

  return (
    <div>
      <Filter filter={filter} onChange={handleFilter} />
      <Countries countries={filteredCountries()} />
      <Country country={filteredCountries().length === 1 ? filteredCountries()[0] : null} />
    </div>
  )
}

export default App
