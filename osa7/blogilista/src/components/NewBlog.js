import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
    props.setNotification(`a new blog ${title.value} by ${author.value} added`, 'success', 10)
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <Button type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    createBlog,
    setNotification
  }
)(NewBlog)
