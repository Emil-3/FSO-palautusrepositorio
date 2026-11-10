import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('the callback function is called with the correct information when creating a blog', async () => {
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)
    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('title:')
    const title = 'Dogs'
    await user.type(titleInput, title)
    const authorInput = screen.getByLabelText('author:')
    const author = 'Jack Jackson'
    await user.type(authorInput, author)
    const urlInput = screen.getByLabelText('url:')
    const url = 'dogs.com'
    await user.type(urlInput, url)
    const button = screen.getByText('create')
    await user.click(button)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(title)
    expect(createBlog.mock.calls[0][0].author).toBe(author)
    expect(createBlog.mock.calls[0][0].url).toBe(url)
  })
})