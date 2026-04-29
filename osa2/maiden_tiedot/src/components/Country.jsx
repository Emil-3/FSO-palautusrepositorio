const Country = ({ country }) => {
    if (!country) {
        return null
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital {country.capital[0]}<br />
            Area {country.area}<br />
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flag.alt}></img>
        </div>
    )
}

export default Country