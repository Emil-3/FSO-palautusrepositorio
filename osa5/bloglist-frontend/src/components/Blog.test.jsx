import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach } from 'vitest'

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
const username = 'Jacky'

describe('<Blog />', () => {
  beforeEach(() => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
  })

  test('the title is rendered', () => {
    screen.getByText('React patterns', { exact: false })
  })

  test('url, likes and user become visible after clicking the view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view', {exact: false})
    await user.click(button)
    const url = screen.getByText('https://reactpatterns.com', { exact: false })
    expect(url).toBeVisible()
    const likes = screen.getByText('likes 7', { exact: false })
    expect(likes).toBeVisible()
    const name = screen.getByText('Jack Jackson', { exact: false })
    expect(name).toBeVisible()
  })
})
