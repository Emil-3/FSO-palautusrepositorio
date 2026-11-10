import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('the title is rendered', () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com',
    likes: 7,
    user: {
      id: '6aedb0ec893ab3f6be1780b0',
      username: 'Jacky',
      name: 'Jack Jackson'
    }
  }
  const handleLike = vi.fn()
  const removeBlog = vi.fn()
  const username = 'Jacky'
  render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
  screen.getByText('React patterns', { exact: false })
})
