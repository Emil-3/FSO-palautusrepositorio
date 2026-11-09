import { useState } from 'react'

const Blog = ({ blog, handleLike, username, removeBlog }) => {
  const [allVisible, setAllVisible] = useState(false)
  const showWhenAllVisible = { display: allVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeButtonStyle = {
    backgroundColor: 'rgb(70, 86, 255)',
    borderRadius: '5px'
  }

  const handleRemoval = () => {
    confirm(`Remove blog ${blog.title} by ${blog.author}`) ? removeBlog(blog.id) : null
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setAllVisible(!allVisible)}>{allVisible ? 'hide' : 'view'}</button>
        <div style={showWhenAllVisible}>
          {blog.url}<br />
          likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br />
          {blog.user.name}<br />
          {(blog.user.username === username)
          && <button style={removeButtonStyle} onClick={handleRemoval}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog
