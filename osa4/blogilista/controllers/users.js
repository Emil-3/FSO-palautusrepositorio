const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body
    if (!password) {
        return response.status(400).json({ error: 'a password is required' })
    } else if (password.length < 3) {
        return response.status(400).json({ error: 'the password has to be at least three characters' })
    }
    const pHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        pHash,
        name
    })
    response.status(201).json(await user.save())
})

module.exports = usersRouter