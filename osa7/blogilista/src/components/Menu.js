import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    props.logout()
  }

  return (
    <div>
      <a href='/' style={padding}>blogs</a>
      <a href='/users' style={padding}>users</a>
      {props.user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logout
}

const ConnectedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default ConnectedMenu
