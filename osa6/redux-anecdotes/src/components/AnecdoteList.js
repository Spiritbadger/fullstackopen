import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {
  console.log(store.getState().anecdotes)
  const anecdotesToShow = () => store.getState().anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.getState().filter.toLowerCase()))

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
                store.dispatch(vote(anecdote.id))
                store.dispatch(notificationChange(`you voted '${anecdote.content}'`
                ))
                setTimeout(() => {
                  store.dispatch(notificationChange(null))
                }, 5000)
              }}>vote</button>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default AnecdoteList
