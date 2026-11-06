const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    req.token = !(auth && auth.startsWith('Bearer '))
        ? null
        : auth.replace('Bearer ', '')
    next()
}

module.exports = { tokenExtractor }