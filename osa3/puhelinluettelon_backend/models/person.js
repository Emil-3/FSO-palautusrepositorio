const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4})
    .then(r => {
        console.log('database connected successfully')
    })
    .catch(error => {
        console.log('database connection error:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: (n) => /^(\d{2}|\d{3})-(\d{1})*$/.test(n),
            message: p => `${p.value} is an invalid number`
        }
    }
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
