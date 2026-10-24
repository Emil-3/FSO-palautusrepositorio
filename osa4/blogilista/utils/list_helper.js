const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((sum, item) => (sum + item), 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    maxLikes = blogs.map(blog => blog.likes).reduce((max, item) => (Math.max(max, item)), 0)
    return blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    let blogsByAuthors = new Map()
    const authorsOfBlogs = blogs.map(blog => blog.author)
    authorsOfBlogs.forEach(author => blogsByAuthors.set(author, 0))
    authorsOfBlogs.forEach(author => {
        let current = blogsByAuthors.get(author)
        blogsByAuthors.set(author, current + 1)
    })
    let maximum = 0
    let maxAuthor = null
    authorsOfBlogs.forEach(author => {
        if (blogsByAuthors.get(author) >= maximum) {
            maximum = blogsByAuthors.get(author)
            maxAuthor = author
        }
    })
    return { author: maxAuthor, blogs: maximum }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
