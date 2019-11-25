const reducer = (state = { message: null, notificationType: null }, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return { message: action.message, notificationType: action.notificationType }
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return { message: null, notificationType: null }
  }
  return state
}

export const setNotification = (message, notificationType, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      notificationType
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        message: null,
        notificationType: null
      })
    }, seconds * 1000)
  }

}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export default reducer
