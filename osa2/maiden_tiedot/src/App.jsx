import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState("")
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.receiveEvery().then(countries => setCountries(countries))
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    const fc = filteredCountries(event.target.value)
    const newCountry = fc.length === 1 ? fc[0] : null
    updateWeather(newCountry)
    setCountry(newCountry)
  }

  const showCountry = (country) => {
    setFilter("")
    updateWeather(country)
    setCountry(country)
  }

  const updateWeather = (country) => {
    if (!country) {
      return
    }
    countryService.receiveWeatherOfCapital(country).then(woc => setWeather(woc))
  }

  const filteredCountries = (fil=filter) => (
    countries.filter(country => RegExp(`(.*)${fil.toLowerCase()}(.*)`).test(country.name.common.toLowerCase()))
  )

  return (
    <div>
      <Filter filter={filter} onChange={handleFilter} />
      <Countries countries={filteredCountries()} showCountry={showCountry} country={country} />
      <Country country={country} />
      <Weather weatherOfCapital={weather} country={country} />
    </div>
  )
}

export default App
