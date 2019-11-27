import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.user)
      return action.user
    case 'INIT_USER':
      return action.user
    case 'LOGOUT':
      return []
    default: return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = await window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        user
      })
    }
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      user
    })

  }
}

export const logout = () => {
  return async dispatch => {
    await blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer
