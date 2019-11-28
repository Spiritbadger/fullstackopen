import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    props.logout()
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Navbar.Text>
            <Button variant="outline-primary" className="mr-sm-2" onClick={handleLogout}>logout</Button> {props.user.name} logged in
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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
