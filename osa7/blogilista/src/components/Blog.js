import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { like, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Table, Form } from 'react-bootstrap'
import { useField } from '../hooks'

let Blog = (props) => {

  const [content, contentReset] = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event)
    props.commentBlog(props.blog, {
      content: content.value,
    })
    contentReset()
    props.history.push('/')
  }

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
        <Button onClick={() => removeBlog(props.blog)} id="delete">delete</Button>
      )
    }
  }

  const addLike = (blog) => {
    props.like(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`, 'success', 10)
    props.history.push('/')
  }

  return (
    <div>
      <h2>{props.blog.title} by {props.blog.author}</ h2>
      <Table>
        <tbody>
          <tr>
            <td>
              <a href={props.blog.url}>{props.blog.url}</a>
            </td>
          </tr>
          <tr>
            <td>{props.blog.likes} likes <Button onClick={() => addLike(props.blog)} id="like">like</Button></td>
          </tr>
          <tr>
            <td>
              added by {props.blog.author}
            </td>
          </tr>
          <tr>
            <td>
              {deleteUserBlog()}
            </td>
          </tr>
          <tr>
            <td >
              <h3>comments:</h3>
            </td>
          </tr>
          <tr>
            <td>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>comment:</Form.Label>
                  <Form.Control id="comment"
                    {...content}
                  />
                  <Button variant="primary" type='submit'>add comment</Button>
                </Form.Group>
              </Form>
            </td>
          </tr>
          {props.blog.comments.map(comment =>
            <tr key={comment.id}>
              <td >
                {comment.content}
              </td>
            </tr>
          )
          }
        </tbody>
      </Table>
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
  setNotification,
  commentBlog
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
