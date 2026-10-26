const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (doc, rObj) => {
    rObj.id = rObj._id.toString()
    delete rObj._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
