import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.vote(anecdote.id)
              props.setNotification(`you voted '${anecdote.content}'`, 5)
            }}>vote</button>
          </div>
        </div>
      )
      }
    </div >
  )
}

const anecdotesToShow = ({ anecdotes, filter }) =>
  anecdotes
    .filter(anecdote => anecdote.content
      .toLowerCase()
      .includes(filter.toLowerCase()))
    .sort((a, b) => a.votes - b.votes)
    .reverse()

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes
