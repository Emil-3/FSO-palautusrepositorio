const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  pHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
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
