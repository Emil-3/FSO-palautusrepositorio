const assert = require('node:assert')
const mongoose = require('mongoose')
const { test, beforeEach, describe, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('with multiple initial blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany()
        await Blog.insertMany(helper.blogs)
    })

    test('the correct amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.blogs.length)
    })

    test('the id field is correctly named', async () => {
        assert((await api.get('/api/blogs')).body[0].hasOwnProperty('id'))
    })

    test('adding a blog increases the amount of blogs in the db by one', async () => {
        const newBlog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual((await helper.blogsInDB()).length, helper.blogs.length + 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})
