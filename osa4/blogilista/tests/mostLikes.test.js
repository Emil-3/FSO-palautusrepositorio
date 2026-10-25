const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = testHelper.blogs

  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('of a list with a single blog is correct', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog),
    { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('of a list with multiple blogs is correct', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs),
    { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
