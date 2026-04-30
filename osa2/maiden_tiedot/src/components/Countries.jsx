const Countries = ({ countries, showCountry, country }) => {
    if (country) {
      return null
    }
    if (countries.length > 10) {
        return (
          <div>
            Too many matches, specify another filter
          </div>
        )
    }
    if (countries.length > 1) {
        return (
          <div>
              {countries.map(country =>
                <div key={country.name.common}>
                  {country.name.common}
                  <button onClick={(e) => showCountry(country)}>Show</button>
                </div>
              )}
          </div>
        )
    }
    return null
}

export default Countries