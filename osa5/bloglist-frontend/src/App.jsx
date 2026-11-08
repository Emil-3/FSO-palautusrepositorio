import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ password, username })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setPassword('')
      setUsername('')
      notify('you have been logged in')
    } catch (e) {
      notify('wrong username or password', 'red')
    }
  }

  const handleLogout = e => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.removeToken()
    notify('you have been logged out')
  }

  const handleBlogCreation = async e => {
    e.preventDefault()
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      notify('the blog could not be created', 'red')
    }
  }

  const notify = (message, color='green', time=4000) => {
      setMessageColor(color)
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, time)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {message && <Notification message={message} color={messageColor} />}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} color={messageColor} />}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <form onSubmit={handleBlogCreation}>
          <div>
            <label>
              title:
              <input
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type='text'
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type='text'
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type='submit'>create</button>
        </form>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App