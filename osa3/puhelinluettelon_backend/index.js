const express = require('express')
const morgan = require('morgan')
const app = express()

let phoneNumberInfo = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-132456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const createID = () => (
    String(Math.floor(Math.random() * 10**9))
)

app.get('/api/persons', (req, res) => {
    res.json(phoneNumberInfo)
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
    if (phoneNumberInfo.map(info => info.name).includes(body.name)) {
        res.status(400).json({
            error: 'name must be unique'
        })
        return
    }
    const person = {
        id: createID(),
        name: req.body.name,
        number: req.body.number
    }
    phoneNumberInfo = phoneNumberInfo.concat(person)
    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = phoneNumberInfo.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(
        `<div>
            Phonebook has info for ${phoneNumberInfo.length} people
        </div>
        <br>
        <div>
            ${Date(Date.now())}
        </div>`
    )
})

app.delete('/api/persons/:id', (req, res) => {
    phoneNumberInfo = phoneNumberInfo.filter(person => person.id !== req.params.id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT)
