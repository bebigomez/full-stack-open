import { useState, useEffect } from 'react'
import Result from './components/Result'
import getAll  from './services/countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getAll()
    .then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        find countries: <input value={search} onChange={handleSearch} />
      </form>

      <Result search={search} countries={countries} />
        
    </div>
  )
}

export default App
