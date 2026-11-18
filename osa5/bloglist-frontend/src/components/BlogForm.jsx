import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>
        create new
      </h2>
      <form onSubmit={handleBlogCreation}>
        <TextField
          label='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        <TextField
          label='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        <TextField
          label='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <div>
          <Button type='submit' variant='contained'>
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm