import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
//import blogService from './services/blogs'
//import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
//import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import LoginForm from './components/LoginForm'

const App = (props) => {
  //const [username] = useField('text')
  //const [password] = useField('password')
  //const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeUser()
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const handleLogout = () => {
    props.logout()
  }

  /*
  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }

  */
  if (props.user.length === 0) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <NewBlog />
      <Blogs />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps, { setNotification, initializeBlogs, initializeUser, logout }
)(App)
