import { useState } from 'react'
import OneCountry from './OneCountry'

const Result = ({ search, countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const lowerCaseSearch = search.toLowerCase()
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(lowerCaseSearch)
  )

  const handleShowDetails = (country) => {
    setSelectedCountry(country)
  }

  const handleCloseDetails = () => {
    setSelectedCountry(null)
  }
  
  return (
    <div>
      {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}

      {countriesToShow.length === 1 && (
        <OneCountry country={countriesToShow[0]} />
      )}

      {countriesToShow.length > 1 && countriesToShow.length <= 10 && (
        <ul>
          {countriesToShow.map((country, index) => (
            <li key={index}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <OneCountry country={selectedCountry} />
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  )
}

export default Result;
