const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()
mongoose.connect(config.mongoUrl, { family: 4 })
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

module.exports = app