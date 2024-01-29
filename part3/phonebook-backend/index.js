require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info of ${persons.length} people</p>
      <p>${new Date()}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((removedItem) => {
      if (removedItem)
        response.status(204).json({ message: 'Person succesfully deleted' }).end()
      else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => {
      next(error)}
    )
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing',
    })
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({
        error: 'The name already exists in the phonebook',
      })
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number,
    })

    newPerson.save().then((savedPerson) => {
      response.json(savedPerson)
    })
      .catch(error => {
        console.log(error)
        next(error)
      })
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
