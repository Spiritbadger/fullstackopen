import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
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
