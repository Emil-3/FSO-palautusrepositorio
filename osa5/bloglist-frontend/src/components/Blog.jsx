import { useState } from 'react'

const Blog = ({ blog, handleLike, username, removeBlog }) => {
  const handleRemoval = () => {
    confirm(`Remove blog ${blog.title} by ${blog.author}`) ? removeBlog(blog.id) : null
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <a href={blog.url}>{blog.url}</a><br />
      likes {blog.likes}{username && <button onClick={() => handleLike(blog)}>like</button>}<br />
      Added by {blog.user.name}<br />
      {(blog.user.username === username)
      && <button onClick={handleRemoval}>remove</button>}
    </div>
  )
}

export default Blog
