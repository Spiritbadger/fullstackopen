import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MenuNoHistory = (props) => {
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    props.logout()
    props.history.push('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/" id="nav_blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users" id="nav_users">Users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Text>
          {props.user.name} logged in <Button variant="outline-primary" className="mr-sm-2" onClick={handleLogout} id="nav_logout">Logout</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Menu = withRouter(MenuNoHistory)

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
