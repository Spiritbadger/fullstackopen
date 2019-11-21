import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  //const { anecdotes, filter } = store.getState()
  const anecdotesToShow = () => props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <div>
      {
        anecdotesToShow().sort((a, b) => a.votes - b.votes).reverse().map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                props.store.dispatch(vote(anecdote.id))
                props.store.dispatch(notificationChange(`you voted '${anecdote.content}'`
                ))
                setTimeout(() => {
                  props.store.dispatch(notificationChange(null))
                }, 5000)
              }}>vote</button>
            </div>
          </div>
        )
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdotes
