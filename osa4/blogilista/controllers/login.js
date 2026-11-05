const bcrypt = require('bcrypt')
const jsonWT = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({ username })
    const passIsCorrect = user
      ? await bcrypt.compare(password, user.pHash)
      : false
    if (!(user && passIsCorrect)) {
        return res.status(401).json( { error: 'username or password is not valid' } )
    }
    const tokenUser = {
        id: user.id,
        username: user.username
    }
    const token = jsonWT.sign(
        tokenUser,
        process.env.SECRET,
        { expiresIn: 30*60 }
    )
    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
