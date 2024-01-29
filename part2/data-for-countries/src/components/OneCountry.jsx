import WeatherSection from "./WeatherSection"

const OneCountry = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <p>
        <strong>Languages:</strong>
      </p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        style={{ maxWidth: '200px' }}
      />
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <WeatherSection city={country.capital[0]} />
      </div>
    </div>
  )
}

export default OneCountry
