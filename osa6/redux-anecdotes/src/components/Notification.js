import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (store.getState().notification === null) {
    return null
  }

  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification
