const jsonWT = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    req.token = !(auth && auth.startsWith('Bearer '))
        ? null
        : auth.replace('Bearer ', '')
    next()
}

const userExtractor = (req, res, next) => {
    deToken = jsonWT.verify(req.token, process.env.SECRET)
    req.user = deToken.id
    next()
}

module.exports = { tokenExtractor, userExtractor }