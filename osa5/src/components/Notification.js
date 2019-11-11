import React from 'react'

const Notification = ({ message, notificationStatus }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notificationStatus}>
      {message}
    </div>
  )
}

export default Notification
