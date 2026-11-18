import { Box, Button } from '@mui/material'

const Blog = ({ blog, handleLike, username, removeBlog }) => {
  const handleRemoval = () => {
    confirm(`Remove blog ${blog.title} by ${blog.author}`) ? removeBlog(blog.id) : null
  }

  if (!blog) return null

  return (
    <Box sx={{ border: 1, padding: 1 }}>
      <h2>
        {blog.title}
      </h2>
      <div style={{padding: '10px 10px 10px 0px'}}>
        by {blog.author}<br/>
      </div>
      <a href={blog.url} style={{padding: '10px 10px 10px 0px'}}>{blog.url}</a><br />
      <div style={{padding: '10px 10px 10px 0px'}}>
        Added by {blog.user.name}<br />
      </div>
      <div>
        {blog.likes} likes
        {username && <Button onClick={() => handleLike(blog)} variant='contained' color='success' style={{margin: 10}}>like</Button>}
        {(blog.user.username === username)
        && <Button onClick={handleRemoval} variant='contained' color='error'>remove</Button>}
      </div>
    </Box>
  )
}

export default Blog
