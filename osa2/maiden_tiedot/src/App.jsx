import { useState, useEffect } from 'react'
import receiveEvery from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    receiveEvery().then(countries => setCountries(countries))
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    const fc = filteredCountries(event.target.value)
    setCountry( fc.length === 1 ? fc[0] : null)
  }

  const showCountry = (country) => {
    setFilter("")
    setCountry(country)
  }

  const filteredCountries = (fil=filter) => (
    countries.filter(country => RegExp(`(.*)${fil.toLowerCase()}(.*)`).test(country.name.common.toLowerCase()))
  )

  return (
    <div>
      <Filter filter={filter} onChange={handleFilter} />
      <Countries countries={filteredCountries()} showCountry={showCountry} country={country} />
      <Country country={country} />
    </div>
  )
}

export default App
