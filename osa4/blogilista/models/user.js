const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  pHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (doc, rObj) => {
    rObj.id = rObj._id.toString()
    delete rObj._id
    delete rObj.__v
    delete rObj.pHash
  }
})

module.exports = mongoose.model('User', userSchema)
