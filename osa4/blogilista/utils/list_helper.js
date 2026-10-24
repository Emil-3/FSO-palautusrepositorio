const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((sum, item) => (sum + item), 0)

module.exports = {
  dummy,
  totalLikes
}
