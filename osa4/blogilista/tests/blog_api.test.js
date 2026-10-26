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
})

after(async () => {
    await mongoose.connection.close()
})
