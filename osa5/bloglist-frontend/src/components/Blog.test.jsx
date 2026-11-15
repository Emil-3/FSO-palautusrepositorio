import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
  test('the title is rendered', () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
    screen.getByText('React patterns', { exact: false })
  })

  test('url, likes and user become visible after clicking the view button', async () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
    const user = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user.click(button)
    const url = screen.getByText('https://reactpatterns.com', { exact: false })
    expect(url).toBeVisible()
    const likes = screen.getByText('likes 7', { exact: false })
    expect(likes).toBeVisible()
    const name = screen.getByText('Jack Jackson', { exact: false })
    expect(name).toBeVisible()
  })

  test('clicking the like button twice calls the handleLike function twice', async () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view', { exact: false })
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(handleLike.mock.calls).toHaveLength(2)
  })

  test('the correct content is shown to a logged out user', () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={null} />)
    expect(screen.getByText('Michael Chan: React patterns')).toBeVisible()
    expect(screen.getByText('https://reactpatterns.com')).toBeVisible()
    expect(screen.getByText('likes 7', { exact: false })).toBeVisible()
    expect(screen.getByText('Jack Jackson', { exact: false })).toBeVisible()
    expect(screen.queryAllByRole('button').length).toEqual(0)
  })

  test('a logged in user who did not add the blog can see the like button but not the remove button', () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={'Matty'} />)
    expect(screen.getByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('a logged in user who added the blog can see both the like button and the remove button', () => {
    const handleLike = vi.fn()
    const removeBlog = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={removeBlog} username={username} />)
    expect(screen.getByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'remove' })).toBeVisible()
  })
})
