const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((sum, item) => (sum + item), 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    maxLikes = blogs.map(blog => blog.likes).reduce((max, item) => (Math.max(max, item)), 0)
    return blogs.filter(blog => blog.likes === maxLikes)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
