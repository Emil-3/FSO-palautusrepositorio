const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes | 0

  const rBlog = await blog.save()
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