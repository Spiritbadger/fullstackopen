import React from 'react'

const User = (props) => {

  return (
    <div>
      <h2>{props.user.name}</h2>
      <b>added blogs:</b>
      <ul>
        {props.user.blogs.map(blog => <li key={blog.id} >{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
