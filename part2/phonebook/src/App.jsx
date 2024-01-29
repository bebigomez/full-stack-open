import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNewName = (event) => {
    return setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    return setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    return setSearch(event.target.value)
  }

  const personsToShow = persons.filter((person) => {
    const lowerCaseName = person.name.toLowerCase()
    const lowerCaseSearch = search.toLowerCase()
    return lowerCaseName.includes(lowerCaseSearch)
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const objectToAdd = {
      name: newName,
      number: newNumber,
    }

    const repeatedPerson = persons.find(
      (person) => person.name === objectToAdd.name
    )

    if (repeatedPerson) {
      const confirmation = window.confirm(
        `${objectToAdd.name} is already added to the phonebook, replace the old number with a new one?`
      )

      if (!confirmation) {
        return
      }

      personService
        .update(repeatedPerson.id, objectToAdd)
        .then((returnedPerson) => {
          setPersons(
            persons.map(person =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          )
        })
        .catch(error => {
          setNotification({ text:error.response.data.error, type: 'error' })
          setTimeout(() => {
            setNotification(null)
          }, 2000);
        })
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(objectToAdd)
      .then(initialPersons => {
        setPersons(persons.concat(initialPersons))
        setNewName('')
        setNewNumber('')
        setNotification({ text:`Added ${objectToAdd.name}`, type:'notification' })
        setTimeout(() => {
          setNotification(null)
        }, 2000);
    })
    .catch(error => {
      setNotification({ text:error.response.data.error, type:'error' })
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    })
  }

  const handleDeletion = (personToDelete) => {
    const confirmation = window.confirm(`Delete ${personToDelete.name}?`)

    if (!confirmation) {
      return
    }

    personService.deletePerson(personToDelete.id)
      .catch((error) => {
        setNotification({ text:`Information of '${personToDelete.name}' has already been removed from server`, type: 'error' })})
        setTimeout(() => {
          setNotification(null)
        }, 2000);
        
    setPersons(
      personsToShow.filter((person) => person.id !== personToDelete.id)
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />

      <Filter search={search} handleSearch={handleSearch} />

      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletion={() => handleDeletion(person)}
        />
      ))}
    </div>
  )
}

export default App
