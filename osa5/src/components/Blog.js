import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [fullInfoVisible, setFullInfoVisible] = useState(false)
  const showWhenVisible = { display: fullInfoVisible ? '' : 'none' }

  const deleteUserBlog = () => {
    if (user.name === blog.user.name) {
      return (
        <div>
          <button onClick={() => removeBlog(blog)}>delete</button>
        </div>
      )
    }

  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setFullInfoVisible(!fullInfoVisible)}>
        {blog.title}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={() => addLike(blog.id)}>like</button>
        <br />
        added by {blog.author}
        {deleteUserBlog()}
      </div>
    </div>
  )
}

export default Blog
