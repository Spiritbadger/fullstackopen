import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}


const ConnectedUsers = connect(
  mapStateToProps
)(Users)

export default ConnectedUsers
