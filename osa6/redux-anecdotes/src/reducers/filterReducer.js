const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.value
    default:
      return state
  }
}

export const filterChange = value => {
  return {
    type: 'SET_FILTER',
    value
  }
}

export default filterReducer
