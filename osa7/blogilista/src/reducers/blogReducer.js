import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const id = action.data.id
      return state.map(blog =>
        blog.id !== id ? blog : action.data.updatedBlog
      )
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}


export const like = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    const updatedBlog = await blogService.update(id, changedBlog)
    console.log('changedBlog')
    console.log(changedBlog)
    console.log('updatedBlog')
    console.log(updatedBlog)

    dispatch({
      type: 'like',
      data: { id, updatedBlog }
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export default blogReducer
