const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0
  const users = await User.find({})
  if (users.length > 0) blog.user = users[0].id
  const rBlog = await blog.save()
  if (users.length > 0) {
    const user = await User.findById(blog.user)
    user.blogs = user.blogs.concat(rBlog)
    await user.save()
  }
  response.status(201).json(rBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToModify = await Blog.findById(request.params.id)
  if (!blogToModify) {
    return response(404).end()
  }
  const { title, author, url, likes } = request.body
  blogToModify.title = title
  blogToModify.author = author
  blogToModify.url = url
  blogToModify.likes = likes
  const modifiedBlog = await blogToModify.save()
  response.json(modifiedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter