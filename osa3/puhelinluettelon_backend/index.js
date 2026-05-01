const express = require('express')
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

app.get('/api/persons', (req, res) => {
    res.json(phoneNumberInfo)
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

const PORT = 3001
app.listen(PORT)
