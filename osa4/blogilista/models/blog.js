const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (doc, rObj) => {
    rObj.id = rObj._id.toString()
    delete rObj._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
