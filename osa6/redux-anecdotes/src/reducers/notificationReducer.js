const notificationReducer = (state = 'Placeholder notification', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.value
    default:
      return state
  }
}

export const notificationChange = value => {
  return {
    type: 'SET_NOTIFICATION',
    value
  }
}

export default notificationReducer