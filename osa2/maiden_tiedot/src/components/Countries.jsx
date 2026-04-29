const Countries = ({ countries }) => {
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
                </div>
              )}
          </div>
        )
    }
    return null
}

export default Countries