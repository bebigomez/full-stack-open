import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange, 
    reset
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(response => {
      setCountry(response)
    })
    .catch((error) => {
      console.error('Error fetching country:', error.message)
      setCountry(null)
    })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.svg} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const { reset, ...nameInputItems } = nameInput

  const fetch = (e) => {
    console.log('COUNTRY: ', country)
    e.preventDefault()
    setName(nameInput.value)
    nameInput.reset()
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInputItems} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App