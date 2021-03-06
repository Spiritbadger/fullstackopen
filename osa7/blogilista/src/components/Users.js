import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )
          }
        </tbody>
      </Table>
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
