import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Blog from './components/Blog'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
//import blogService from './services/blogs'
//import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
//import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'

const App = (props) => {
  //const [username] = useField('text')
  //const [password] = useField('password')
  //const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeUser()
    props.initializeBlogs()
    props.initializeUsers()
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

  const blogById = (id) =>
    props.blogs.find(a => a.id === id)

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
      <Router>
        <h2>blogs</h2>
        <Notification />
        <p>{props.user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Route exact path="/" render={() =>
          <div>
            <NewBlog />
            <Blogs />
          </div>
        } />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} user={props.user} />}
        />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps, { setNotification, initializeBlogs, initializeUser, logout, initializeUsers }
)(App)
