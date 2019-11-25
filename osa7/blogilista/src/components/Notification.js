import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification.message === null) {
    return null
  }

  const style = {
    color: props.notification.notificationType === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
