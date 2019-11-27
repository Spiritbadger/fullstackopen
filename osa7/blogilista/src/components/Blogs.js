import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <table className="table striped">
        <tbody>
          {props.blogs.sort(byLikes).map(blog =>
            <tr key={blog.id}>
              <td >
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
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
