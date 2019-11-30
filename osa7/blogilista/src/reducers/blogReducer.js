import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case 'COMMENT':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.blog.id)
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

export const like = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(liked)
    dispatch({
      data,
      type: 'LIKE'
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

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      blog
    })
  }
}

export const commentBlog = (blog, content) => {
  return async dispatch => {
    const newComment = await blogService.comment(blog, content)
    const commented = { ...blog, comments: [...blog.comments, { content: newComment.content, id: newComment.id }] }
    console.log(commented)
    dispatch({
      type: 'COMMENT',
      data: commented
    })
  }
}

export default blogReducer
