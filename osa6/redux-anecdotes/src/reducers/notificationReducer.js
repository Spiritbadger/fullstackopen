const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.value
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (value, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      value
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timer * 1000)
  }

}

export default notificationReducer
