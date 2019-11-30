import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Blog from './components/Blog'
import User from './components/User'
import Menu from './components/Menu'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import { Jumbotron } from 'react-bootstrap'

const App = (props) => {

  useEffect(() => {
    props.initializeUser()
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  const blogById = (id) =>
    props.blogs.find(a => a.id === id)

  const userById = (id) =>
    props.users.find(a => a.id === id)

  if (props.user.length === 0) {
    return (
      <div className="container">
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <Menu />
        <Jumbotron>
          <h1>Blog app</h1>
        </Jumbotron>
        <Notification />
        <Route exact path="/" render={() =>
          <div>
            <h2>Blogs</h2>
            <NewBlog />
            <Blogs />
          </div>
        } />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />}
        />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />}
        />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps, { setNotification, initializeBlogs, initializeUser, logout, initializeUsers }
)(App)
