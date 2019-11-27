import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

let Blog = (props) => {

  const removeBlog = async () => {
    const ok = window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      props.deleteBlog(props.blog)
      props.history.push('/')
      props.setNotification(`blog ${props.blog.title} by ${props.blog.author} removed!`, 'success', 10)
    }
  }

  const deleteUserBlog = () => {
    if (props.user.name === props.blog.user.name) {
      return (
        <div>
          <Button onClick={() => removeBlog(props.blog)}>delete</Button>
        </div >
      )
    }
  }

  const addLike = (blog) => {
    props.like(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`, 'success', 10)
  }

  return (
    <div>
      <h2>{props.blog.title} {props.blog.author}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes <Button onClick={() => addLike(props.blog)}>like</Button></div>
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
