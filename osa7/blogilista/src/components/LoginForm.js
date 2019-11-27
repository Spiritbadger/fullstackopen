import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      props.setNotification('wrong username of password', 'error', 10)
      usernameReset()
      passwordReset()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
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
