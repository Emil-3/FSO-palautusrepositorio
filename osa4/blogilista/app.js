const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
mongoose.connect(config.mongoUrl, { family: 4 })
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('duplicate key error')) {
        return res.status(400).json({ error: 'username is not unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'the token is not valid or missing' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'the token has expired' })
    }
    next(error)
}

app.use(errorHandler)

module.exports = app