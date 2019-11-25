import React from 'react'
import { useField } from '../hooks'
//import PropTypes from 'prop-types'
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
      props.setNotification('wrong username of password', 'error')
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

/*
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
*/

export default connect(
  null,
  {
    login,
    setNotification
  }
)(LoginForm)
