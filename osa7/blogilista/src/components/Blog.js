import React from 'react'

const Blog = ({ blog, user }) => {

  const deleteUserBlog = () => {
    if (user.name === blog.user.name) {
      return (
        <div>
          <button onClick={() => { console.log('delete') }}>delete</button>
        </div >
      )
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => { console.log('like') }}>like</button></div>
      <div>added by {blog.author}</div>
      {deleteUserBlog()}
      <br />
    </div>
  )
}

export default Blog
