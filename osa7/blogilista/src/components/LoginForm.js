import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      props.login({
        username: username.value,
        password: password.value,
      })
    } catch (exception) {
      props.setNotification('wrong username of password', 'danger', 10)
      usernameReset()
      passwordReset()
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control id="username"
            {...username}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control id="password"
            {...password}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    login,
    setNotification
  }
)(LoginForm)
