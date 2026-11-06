const jsonWT = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const deToken = jsonWT.verify(request.token, process.env.SECRET)
  if (!deToken.id) {
    return response.status(401).json({ error: 'the token is not valid' })
  }
  const user = await User.findById(deToken.id)
  if (!user) {
    return response.status(400).json({ error: 'the userID is invalid or missing' })
  }
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0
  blog.user = deToken.id
  const rBlog = await blog.save()
  user.blogs = user.blogs.concat(rBlog.id)
  await user.save()
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
  const deToken = jsonWT.verify(request.token, process.env.SECRET)
  if (!deToken.id) {
    return response.status(401).json({ error: 'the token is not valid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog || (blog.user.toString() !== deToken.id.toString())) {
    return response.status(401).json({ error: 'the blog does not exist or the user is incorrect' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  const user = await User.findById(blog.user)
  user.blogs = user.blogs.filter(blog => blog !== request.params.id)
  await user.save()
  response.status(204).end()
})

module.exports = blogsRouter