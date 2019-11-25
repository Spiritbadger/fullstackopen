import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {
  //const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  /*
  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator && (<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )
*/
  return (
    <div>
      {props.blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          {blog.title} {blog.author}
        </div>
      )
      }
    </div>
  )
}
/*
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}
*/

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  like,
  setNotification
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)

export default ConnectedBlogs
