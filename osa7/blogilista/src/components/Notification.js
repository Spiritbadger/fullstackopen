import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  if (props.notification.message === null) {
    return null
  }
  return (
    <Alert variant={props.notification.notificationType}>
      {props.notification.message}
    </Alert>
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
