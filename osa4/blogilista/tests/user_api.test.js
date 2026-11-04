const supertest = require('supertest')
const mongoose = require('mongoose')
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('without initial users', () => {
    beforeEach(async () => {
        await User.deleteMany()
    })

    test('the same user cannot be added twice', async () => {
        const newUser = {
            username: 'Jacky',
            password: 'passy',
            name: 'Jack Jackson'
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        const res = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        assert(res.body.error === 'username is not unique')
        assert.strictEqual((await helper.usersInDB()).length, 1)
    })

    test('a user with a too short username cannot be created', async () => {
        const newUser = {
            username: 'Ja',
            password: 'passy',
            name: 'Jack Jackson'
        }
        const res = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        assert(/is shorter than the minimum allowed length/.test(res.body.error))
        assert.strictEqual((await helper.usersInDB()).length, 0)
    })

    test('a user with a too short password cannot be created', async () => {
        const newUser = {
            username: 'Jacky',
            password: 'pa',
            name: 'Jack Jackson'
        }
        const res = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        assert(/the password has to be at least three characters/.test(res.body.error))
        assert.strictEqual((await helper.usersInDB()).length, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
})