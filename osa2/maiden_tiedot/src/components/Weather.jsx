const Weather = ({ weatherOfCapital, country }) => {
    if ((!country) || (!weatherOfCapital)) {
        return null
    }
    return (
        <div>
            <h2>Weather of {country.capital}</h2>
            <div>
                Temperature {weatherOfCapital.main.temp} Celsius
            </div>
            <div>
                <img src={`https://openweathermap.org/payload/api/media/file/${weatherOfCapital.weather[0].icon}.png`}></img>
            </div>
            <div>
                Wind {weatherOfCapital.wind.speed} m/s
            </div>
        </div>
    )
}

export default Weather