require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    if (!body.name) {
        res.status(400).json({
            error: 'name missing'
        })
        return
    }
    if (!body.number) {
        res.status(400).json({
            error: 'number missing'
        })
        return
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(sPerson => {
        res.json(sPerson)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const number = req.body.number
    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).end()
            }
            person.number = number
            return person.save().then(rPerson => {
                res.json(rPerson)
            })
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        res.send(
            `<div>
                Phonebook has info for ${people.length} people
            </div>
            <br>
            <div>
                ${Date(Date.now())}
            </div>`
        )
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(r => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'incorrectly formatted id'})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
