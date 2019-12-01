import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Accordion, Card, Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event)
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
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" id="create_new">
              Create new
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body><Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control id="title"
                  {...title}
                />
                <Form.Label>author:</Form.Label>
                <Form.Control id="author"
                  {...author}
                />
                <Form.Label>url:</Form.Label>
                <Form.Control id="url"
                  {...url}
                />
                <Button variant="primary" type='submit' id="create">create</Button>
              </Form.Group>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                cancel
              </Accordion.Toggle>
            </Form></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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
