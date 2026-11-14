import { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')
  const navi = useNavigate()
  const pad = { padding: 8 }

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
      navi('/')
      notify('you have been logged in')
    } catch {
      notify('wrong username or password', 'red')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.removeToken()
    navi('/')
    notify('you have been logged out')
  }

  const handleBlogCreation = async blogObj => {
    try {
      let createdBlog = await blogService.create(blogObj)
      createdBlog.user = { id: createdBlog.user, username: user.username, name: user.name }
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch {
      notify('the blog could not be created', 'red')
    }
  }

  const handleLike = async blog => {
    const newBlog = await blogService.modify({ ...blog, likes: blog.likes + 1 })
    const newBlogWithUser = { ...newBlog, user: blog.user }
    setBlogs(blogs.map(b => b.id === newBlogWithUser.id ? newBlogWithUser : b))
  }

  const notify = (message, color='green', time=4000) => {
    setMessageColor(color)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, time)
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notify('blog deleted')
    } catch {
      notify('the blog could not be deleted', 'red')
    }
  }

  return (
    <div>
      <div>
        <Link style={pad} to='/'>blogs</Link>
        {!user && <Link style={pad} to='/login'>login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
      <Routes>
        <Route path='/' element={
          <div>
            <h2>blogs</h2>
            {message && <Notification message={message} color={messageColor} />}
            {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} username={user ? user.username : null} removeBlog={removeBlog} />
            )}
          </div>
        } />
        <Route path='/login' element={
          <div>
            <h2>Log in to application</h2>
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
        } />
      </Routes>
    </div>
  )
}

export default App