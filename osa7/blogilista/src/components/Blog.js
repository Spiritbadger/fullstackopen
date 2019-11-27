import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

let Blog = (props) => {

  const removeBlog = async () => {
    const ok = window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      /*
      const updatedBlog = await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      */
      props.deleteBlog(props.blog)
      props.setNotification(`blog ${props.blog.title} by ${props.blog.author} removed!`)
      props.history.push('/')
    }
  }

  const deleteUserBlog = () => {
    if (props.user.name === props.blog.user.name) {
      return (
        <div>
          <button onClick={() => removeBlog(props.blog)}>delete</button>
        </div >
      )
    }
  }

  const addLike = (blog) => {
    props.like(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`, 10)
  }

  return (
    <div>
      <h2>{props.blog.title} {props.blog.author}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes <button onClick={() => addLike(props.blog)}>like</button></div>
      <div>added by {props.blog.author}</div>
      {deleteUserBlog()}
      <br />
    </div>
  )

}

Blog = withRouter(Blog)

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  like,
  deleteBlog,
  setNotification
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
