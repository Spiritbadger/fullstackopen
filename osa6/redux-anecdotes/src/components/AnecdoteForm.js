import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`you added '${content}'`)
    setTimeout(() => { props.notificationChange(null) }, 5000)
  }

  return (
    <div><h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  {
    createAnecdote,
    notificationChange
  }
)(NewAnecdote)
